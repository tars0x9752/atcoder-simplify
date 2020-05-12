import * as vscode from 'vscode'
import { fs, createBuffer } from '@vscode/fs/fs'
import { posix } from 'path'
import { SampleCasePayload } from '@shared/types/sample-case-payload'

// コンテスト関連のファイル操作はここに集約する

enum CaseFileExt {
  In = '.in',
  Out = '.out',
}

// ユーザーが問題の解答コードを書く用のファイルを生成する
export const createTaskSolutionFile = (contestName: string, taskName: string) => {
  const filePath = posix.join(contestName, taskName, `${taskName}.cpp`)

  const fileUri = fs.createFileUriFromRoot(filePath)

  if (fileUri === false) {
    return
  }

  fs.createBlankFile(fileUri)
}

export const createSampleCaseFiles = (cases: string[], ext: CaseFileExt, basePath: string) => {
  cases.map((caseStr, i) => {
    const sampleNumber = i + 1

    const fileName = `sample-${sampleNumber}${ext}`

    const filePath = posix.join(basePath, fileName)

    const fileUri = fs.createFileUriFromRoot(filePath)

    if (fileUri === false) {
      return
    }

    const content = createBuffer(caseStr)

    fs.writeFile(fileUri, content)
  })
}

export const createTaskRelatedFiles = ({
  contestName,
  taskName,
  inputSampleCases,
  outputSampleCases,
}: SampleCasePayload) => {
  const basePath = posix.join(contestName, taskName, 'cases')

  createSampleCaseFiles(inputSampleCases, CaseFileExt.In, basePath)
  createSampleCaseFiles(outputSampleCases, CaseFileExt.Out, basePath)
  createTaskSolutionFile(contestName, taskName)
}

export const getDirname = (currentFileUri: vscode.Uri) => {
  return posix.dirname(currentFileUri.path)
}

export const parseCurrentFileUri = (currentFileUri: vscode.Uri) => {
  const cwd = getDirname(currentFileUri)
  const taskName = posix.basename(currentFileUri.path, '.cpp')
  const executablePath = posix.join(cwd, `${taskName}.exe`)
  const executableUri = currentFileUri.with({ path: executablePath })

  return {
    cwd,
    taskName,
    executableUri,
  }
}

export const isCpp = (filePath: string) => {
  return posix.extname(filePath) === '.cpp'
}

export const findInputCases = async (cwd: string) => {
  const root = fs.rootPath as string

  // findFiles は RelativePath 前提なので Relative にしている
  const relativeCwd = posix.relative(root, cwd)

  return vscode.workspace.findFiles(`${relativeCwd}/cases/*.in`)
}

export const getCasenames = (inputCases: vscode.Uri[]) => {
  return inputCases.map(inputCase => posix.basename(inputCase.path, '.in'))
}
