import * as vscode from 'vscode'
import { startServerCmd, closeServerCmd } from '@vscode/commands/server'

enum Cmd {
  Start = '起動する',
  Close = '停止する',
}

export const showQuickPickCmd = async () => {
  const cmdList = [Cmd.Start, Cmd.Close]

  const selected = (await vscode.window.showQuickPick(cmdList))

  switch (selected) {
    case Cmd.Start:
      startServerCmd()
      return
    case Cmd.Close:
      closeServerCmd()
      return
  }
}
