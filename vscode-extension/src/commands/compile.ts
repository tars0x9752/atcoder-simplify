import * as vscode from 'vscode'
import { terminal } from '@vscode/terminal/terminal'
import { fs } from '@vscode/fs/fs'
import { posix } from 'path'

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

// ほんとはコレじゃなくてユーザー自信でコンパイルして欲しい
const compile = (cwd: string, cppPath: string, outputPath: string) => {
  if (!terminal.active) {
    terminal.create()
  }

  // 絶対pathでやるとterminal上の表記が長くなって嫌なのでcdしてる
  terminal.sendText(`cd ${cwd}`)

  // 将来的には設定からコマンドを変えられるようにしたい
  terminal.sendText(`g++ -o ${outputPath} ${cppPath}`)

  terminal.show(true)
}

export const compileCmd = () => {
  const currentFileUri = vscode.window.activeTextEditor?.document.uri

  if (currentFileUri === undefined) {
    return
  }

  const { cwd, taskName } = parseCurrentFilePath(currentFileUri.fsPath)

  compile(cwd, `${taskName}.cpp`, `${taskName}.exe`)
}
