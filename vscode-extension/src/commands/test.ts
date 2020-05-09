import * as vscode from 'vscode'
import { posix } from 'path'
import { exec, ExecOptions } from 'child_process'
import { promisify } from 'util'
import { fs } from '@vscode/fs/fs'

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
    return
  }

  results.map(({ stdout: result }) => {
    console.log(result)
  })
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

  const { cwd, executablePath } = parseCurrentFilePath(currentFileUri.fsPath)

  const executableUri = currentFileUri.with({ path: executablePath })

  if (!fs.checkExistence(executableUri)) {
    vscode.window.showInformationMessage('実行ファイルがみつかりません')
    return
  }

  const execOptions: ExecOptions = { cwd }

  const root = fs.rootPath as string

  // findFiles は RelativePath 前提なので Relative にしている
  const relativeCwd = posix.relative(root, cwd)

  const inputCases = await vscode.workspace.findFiles(`${relativeCwd}/test/*.in`)

  execTests(inputCases, executablePath, execOptions)
}
