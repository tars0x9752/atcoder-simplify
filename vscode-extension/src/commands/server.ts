import * as vscode from 'vscode'
import { server } from '@vscode/server/server'
import { updateStatusBarItem } from '@vscode/status-bar/status-bar'

export const startServerCmd = async () => {
  const result = server.start()

  const msg = result ? '起動しました' : '既に起動済みです。'

  vscode.window.showInformationMessage(msg)

  updateStatusBarItem(server.state)
}

export const closeServerCmd = async () => {
  const result = await server.close()

  const msg = result ? '停止しました' : '既に停止しています。'

  vscode.window.showInformationMessage(msg)

  updateStatusBarItem(server.state)
}
