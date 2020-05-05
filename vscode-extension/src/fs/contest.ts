import { fs } from '@vscode/fs/fs-consumer'
import { posix } from 'path'

// コンテスト関連のファイル操作はここに集約する

// ユーザーが問題の解答コードを書く用のファイルを生成する
export const createTaskSolutionFile = (contestName: string, taskName: string) => {
  const filePath = posix.join(contestName, taskName, `${taskName}.cpp`)

  const fileUri = fs.createFileUriFromRoot(filePath)

  if (fileUri === false) {
    return
  }

  fs.createBlankFile(fileUri)
}
