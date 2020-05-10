import * as vscode from 'vscode'
import { server } from '@vscode/server/server'
import { updateStatusBarItem } from '@vscode/ui/status-bar'
import { cmdId } from '@vscode/commands/id'

const PREFIX = 'AtCoder Simplify: '

const message = {
  start: `${PREFIX}起動しました`,
  alreadyStarted: `${PREFIX}既に起動済みです`,
  close: `${PREFIX}停止しました`,
  alreadyClosed: `${PREFIX}既に停止しています`,
}

export const startServerCmd = async () => {
  const result = server.start()

  const msg = result ? message.start : message.alreadyStarted

  vscode.window.showInformationMessage(msg)

  console.log(cmdId.close)

  updateStatusBarItem(server.state, cmdId.close)
}

export const closeServerCmd = async () => {
  const result = await server.close()

  const msg = result ? message.close : message.alreadyClosed

  vscode.window.showInformationMessage(msg)

  updateStatusBarItem(server.state, cmdId.start)
}
