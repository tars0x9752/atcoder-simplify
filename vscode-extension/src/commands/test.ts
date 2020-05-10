import * as vscode from 'vscode'
import { posix } from 'path'
import { exec, ExecOptions } from 'child_process'
import { promisify } from 'util'
import { fs, createBuffer } from '@vscode/fs/fs'
import { outputChannel } from '@vscode/ui/output-channel'

const execP = promisify(exec)

const handleReject = (err: Error) => {
  console.log(err)
}

const execTests = async (
  inputCases: vscode.Uri[],
  executablePath: string,
  execOptions: ExecOptions
) => {
  const promisedResults = inputCases.map(uri => {
    return execP(`${executablePath} < ${uri.fsPath}`, execOptions)
  })

  const results = (await Promise.all(promisedResults).catch(handleReject)) || false

  // reject が発生した場合は results は false
  if (results === false) {
    vscode.window.showInformationMessage('実行時に問題が発生したため中断されました')
    return
  }

  return results
}

const parseCurrentFilePath = (currentFilePath: string) => {
  const cwd = posix.dirname(currentFilePath)
  const taskName = posix.basename(currentFilePath, '.cpp')
  const executablePath = posix.join(cwd, `${taskName}.exe`)

  return {
    cwd,
    taskName,
    executablePath,
  }
}

export const testCmd = async () => {
  const currentFileUri = vscode.window.activeTextEditor?.document.uri

  if (currentFileUri === undefined) {
    return
  }

  const { cwd, executablePath, taskName } = parseCurrentFilePath(currentFileUri.fsPath)

  const executableUri = currentFileUri.with({ path: executablePath })

  if (!(await fs.checkExistence(executableUri))) {
    vscode.window.showInformationMessage(
      '実行ファイルがみつかりません。コンパイル時の -o オプションにcppファイルと同じ階層に同じ名称.exeという形で実行ファイルを出力するように指定してコンパイルしてください。task を使ってコンパイルしている場合は -o に対して ${fileDirname}/${fileBasenameNoExtension}.exe を指定してください。'
    )
    return
  }

  const execOptions: ExecOptions = { cwd, timeout: 2000 }

  const root = fs.rootPath as string

  // findFiles は RelativePath 前提なので Relative にしている
  const relativeCwd = posix.relative(root, cwd)

  const inputCases = await vscode.workspace.findFiles(`${relativeCwd}/cases/*.in`)

  const results = (await execTests(inputCases, executablePath, execOptions)) ?? []

  if (results.length === 0) {
    return
  }

  const testsPromised = results.map(({ stdout: result }, i) => {
    const resultBuffer = createBuffer(result)

    const casename = posix.basename(inputCases[i].fsPath, '.in')

    const resultPath = posix.join(cwd, 'results', `${casename}.res`)

    fs.writeFile(currentFileUri.with({ path: resultPath }), resultBuffer)

    return vscode.workspace
      .openTextDocument(currentFileUri.with({ path: posix.join(cwd, 'cases', `${casename}.out`) }))
      .then(expected => {
        return result === expected.getText()
      })
  })

  const tests = (await Promise.all(testsPromised)) || []

  outputChannel.appendLine(`=== ${taskName} ===`)

  tests.map((test, i) => {
    const casename = posix.basename(inputCases[i].fsPath, '.in')

    if (test) {
      outputChannel.appendLine(`${casename}: AC ✅`)
    } else {
      outputChannel.appendLine(`${casename}: WA ❌`)
    }
  })

  outputChannel.appendLine('')
  outputChannel.show()
}
