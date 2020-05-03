import * as vscode from 'vscode'
import { startServer } from '../server'

export const startCmd = () => {
  startServer()

  vscode.window.showInformationMessage('start')
}
