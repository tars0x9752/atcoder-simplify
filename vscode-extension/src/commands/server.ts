import * as vscode from 'vscode'
import { server } from '@vscode/server/server'
import { updateStatusBarItem } from '@vscode/ui/status-bar'
import { cmdId } from '@vscode/commands/id'
import { EXT_NAME } from '@vscode/env'

const PREFIX = `${EXT_NAME}: `

const message = {
  start: `${PREFIX}起動しました`,
  alreadyStarted: `${PREFIX}既に起動済みです`,
  close: `${PREFIX}停止しました`,
  alreadyClosed: `${PREFIX}既に停止しています`,
}

export const startCmd = async () => {
  const result = server.start()

  const msg = result ? message.start : message.alreadyStarted

  vscode.window.showInformationMessage(msg)

  console.log(cmdId.close)

  updateStatusBarItem(server.state, cmdId.pick)

  vscode.window.createTerminal(EXT_NAME)
}

export const closeCmd = async () => {
  const result = await server.close()

  const msg = result ? message.close : message.alreadyClosed

  vscode.window.showInformationMessage(msg)

  updateStatusBarItem(server.state, cmdId.start)

  const terminal = vscode.window.terminals.find(v => v.name === EXT_NAME)

  if (terminal) {
    terminal.dispose()
  }
}
