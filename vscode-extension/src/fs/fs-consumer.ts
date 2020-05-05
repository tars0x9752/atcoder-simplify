import * as vscode from 'vscode'

export class FsConsumer {
  constructor() {}

  get rootPath() {
    const { workspaceFolders } = vscode.workspace

    return workspaceFolders !== undefined ? workspaceFolders[0].uri.fsPath : false
  }

  // Uri を作る（ただし、scheme は file 固定かつ authority 等は指定なし）
  createFileUriFromRoot(path: string) {
    const { rootPath } = this

    if (rootPath === false) {
      return false
    }

    return vscode.Uri.file(`${rootPath}/${path}`)
  }

  // baseUri の authority や scheme を保ったまま新しい Uri を作る
  createUriFromBase(baseUri: vscode.Uri, path: string) {
    return baseUri.with({ path: path })
  }

  // thenable なので await すること
  checkExistence(uri: vscode.Uri): Thenable<boolean> {
    return vscode.workspace.fs.stat(uri).then(
      _ => true,
      _ => false
    )
  }

  // ファイルを作る(mkdir -p 的な感じで必要に応じでDirも作られる)
  // ファイルが既に存在する場合は何もしない
  async writeFile(uri: vscode.Uri, content: Uint8Array) {
    const alreadyExists = await this.checkExistence(uri)

    if (alreadyExists) {
      return
    }

    vscode.workspace.fs.writeFile(uri, content)
  }

  createBlankFile(uri: vscode.Uri) {
    this.writeFile(uri, Buffer.from('', 'utf8'))
  }
}

export const fs = new FsConsumer()

export const createBuffer = (str: string) => {
  return Buffer.from(str, 'utf8')
}
