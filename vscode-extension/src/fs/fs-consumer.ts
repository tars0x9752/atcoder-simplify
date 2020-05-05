import * as vscode from 'vscode'
import { posix } from 'path'

export const rootPath = () => {
  const { workspaceFolders } = vscode.workspace

  return workspaceFolders !== undefined ? workspaceFolders[0].uri.fsPath : false
}

// Uri を作る（ただし、scheme は file 固定かつ authority 等は指定なし）
export const createFileUriFromRoot = (path: string) => {
  const root = rootPath()

  if (root === false) {
    return false
  }

  return vscode.Uri.file(`${root}/${path}`)
}

// baseUri の authority や scheme を保ったまま新しい Uri を作る
export const createUriFromBase = (baseUri: vscode.Uri, path: string) => {
  return baseUri.with({ path: path })
}

// thenable なので await すること
export const checkExistence = (uri: vscode.Uri): Thenable<boolean> => {
  return vscode.workspace.fs.stat(uri).then(
    _ => true,
    _ => false
  )
}

// ファイルを作る(mkdir -p 的な感じで必要に応じでDirも作られる)
// ファイルが既に存在する場合は何もしない
export const writeFile = async (uri: vscode.Uri, content: Uint8Array) => {
  const alreadyExists = await checkExistence(uri)

  if (alreadyExists) {
    return
  }

  vscode.workspace.fs.writeFile(uri, content)
}

export const createBlankFile = (uri: vscode.Uri) => {
  writeFile(uri, Buffer.from('', 'utf8'))
}

// ユーザーが問題の解答コードを書く用のファイルを生成する
export const createTaskSolutionFile = (contestName: string, taskName: string) => {
  const filePath = posix.join(contestName, taskName, `${taskName}.cpp`)

  const fileUri = createFileUriFromRoot(filePath)

  if (fileUri === false) {
    return
  }

  createBlankFile(fileUri)
}
