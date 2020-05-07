import * as vscode from 'vscode'
import { server } from '@vscode/server/server'

export const startServerCmd = async () => {
  const result = server.start()

  const msg = result ? 'started' : 'already running'

  vscode.window.showInformationMessage(msg)
}

export const closeServerCmd = async () => {
  const result = await server.close()

  const msg = result ? 'closed' : 'already closed'

  vscode.window.showInformationMessage(msg)
}
