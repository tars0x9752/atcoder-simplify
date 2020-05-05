import { fs, createBuffer } from '@vscode/fs/fs-consumer'
import { posix } from 'path'
import { SampleCasePayload } from '@shared/types/sample-case-payload'

// コンテスト関連のファイル操作はここに集約する

enum CaseFileExt {
  In = '.in',
  Out = '.out'
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

    const fileName = `sample-${sampleNumber}.${ext}`

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
  const basePath = posix.join(contestName, taskName, 'test')

  createSampleCaseFiles(inputSampleCases, CaseFileExt.In, basePath)
  createSampleCaseFiles(outputSampleCases, CaseFileExt.Out, basePath)
  createTaskSolutionFile(contestName, taskName)
}
