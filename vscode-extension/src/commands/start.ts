import * as vscode from 'vscode'
import { startServer } from '@vscode/server'
import { createTaskSolutionFile } from '@vscode/fs/contest'

export const startCmd = async () => {
  startServer()

  // sample usage
  createTaskSolutionFile('contestName', 'taskName')

  vscode.window.showInformationMessage('start')
}
