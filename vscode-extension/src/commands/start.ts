import * as vscode from 'vscode'
import { startServer } from '@vscode/server'

export const startCmd = () => {
  startServer()

  vscode.window.showInformationMessage('start')
}
