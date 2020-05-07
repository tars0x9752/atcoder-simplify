import * as vscode from 'vscode'
import { server, ServerState } from '@vscode/server/server'
import { updateStatusBarItem } from '@vscode/status-bar/status-bar'

export const startServerCmd = async () => {
  const result = server.start()

  const msg = result ? 'started' : 'already running'

  vscode.window.showInformationMessage(msg)

  updateStatusBarItem(server.state)
}

export const closeServerCmd = async () => {
  const result = await server.close()

  const msg = result ? 'closed' : 'already closed'

  vscode.window.showInformationMessage(msg)

  updateStatusBarItem(server.state)
}
