import * as vscode from 'vscode'
import { posix } from 'path'
import { exec, ExecOptions } from 'child_process'
import { promisify } from 'util'
import { outputChannel } from '@vscode/ui/output-channel'
import { fs, createBuffer } from '@vscode/fs/fs'
import { parseCurrentFileUri, isCpp, findInputCases, getCasenames } from '@vscode/fs/contest'

interface Result {
  stdout: string
  stderr: string
}

const execP = promisify(exec)

const handleReject = (err: Error) => {
  console.log(err)
}

// inputCasesを実行して出力をreturn
const execInputCases = async (
  inputCases: vscode.Uri[],
  executableUri: vscode.Uri,
  execOptions: ExecOptions
) => {
  const promisedResults = inputCases.map(uri => {
    return execP(`${executableUri.fsPath} < ${uri.fsPath}`, execOptions)
  })

  const results = (await Promise.all(promisedResults).catch(handleReject)) || false

  // reject が発生した場合は results は false
  if (!results) {
    return
  }

  return results
}

// 全実行結果をファイルに保存
const writeResults = async (results: Result[], casenames: string[], cwd: string) => {
  const writeResult = async ({ stdout: result }: Result, i: number) => {
    const resultBuffer = createBuffer(result)

    const casename = posix.basename(casenames[i], '.in')

    const resultPath = posix.join(cwd, 'results', `${casename}.result`)

    const resultUri = vscode.Uri.file(resultPath)

    fs.writeFile(resultUri, resultBuffer, true)
  }

  return await Promise.all(results.map(writeResult))
}

// 実行結果とoutファイルを比較して正しい答えかテスト
const testResults = async (results: Result[], casenames: string[], cwd: string) => {
  const testResult = async ({ stdout: result }: Result, i: number) => {
    const casename = posix.basename(casenames[i], '.in')

    const outputCasePath = posix.join(cwd, 'cases', `${casename}.out`)

    const outputCaseUri = vscode.Uri.file(outputCasePath)

    const document = await vscode.workspace.openTextDocument(outputCaseUri)

    return result === document.getText()
  }

  return await Promise.all(results.map(testResult))
}

export const testCmd = async () => {
  const currentFileUri = fs.currentFileUri

  if (currentFileUri === undefined) {
    return
  }

  if (!isCpp(currentFileUri.path)) {
    return
  }

  const { cwd, taskName, executableUri } = parseCurrentFileUri(currentFileUri)

  if (!(await fs.checkExistence(executableUri))) {
    vscode.window.showInformationMessage(
      'アクティブなcppファイルが存在しない、または実行ファイルが既定のpathに存在しません。cppファイルと同じ階層に、問題名.exe という名称でコンパイルしてください。task を使ってコンパイルしている場合は -o に対して ${fileDirname}/${fileBasenameNoExtension}.exe を指定してください。'
    )
    return
  }

  const execOptions: ExecOptions = { cwd, timeout: 2000 }

  const inputCases = await findInputCases(cwd)

  if (inputCases.length === 0) {
    vscode.window.showInformationMessage(
      'サンプルケースが見つかりません。サンプルケースを取得してから再度実行してください。'
    )
    return
  }

  const results = (await execInputCases(inputCases, executableUri, execOptions)) ?? []

  if (results.length === 0) {
    vscode.window.showInformationMessage('実行時に問題が発生したため中断されました')
    return
  }

  const casenames = getCasenames(inputCases)

  await writeResults(results, casenames, cwd)

  const answers = (await testResults(results, casenames, cwd)) || []

  outputChannel.appendLine(`=== ${taskName} ===`)

  answers.map((answer, i) => {
    if (answer) {
      outputChannel.appendLine(`${casenames[i]}: AC ✅`)
    } else {
      outputChannel.appendLine(`${casenames[i]}: WA ❌`)
    }
  })

  outputChannel.appendLine('')

  // cppファイルからOCにフォーカスが移ってしまうとUXがあんまりよくないので、フォーカスは奪わないようにする
  outputChannel.show(true)
}
