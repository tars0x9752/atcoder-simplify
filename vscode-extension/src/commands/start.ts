import * as vscode from 'vscode'
import { startServer } from '@vscode/server'
import { createTaskSolutionFile } from '@vscode/fs/contest'

export const startCmd = async () => {
  startServer()

  vscode.window.showInformationMessage('start')
}
