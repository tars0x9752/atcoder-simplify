import * as vscode from 'vscode'
import { startServer } from '@vscode/server'
import { createTaskSolutionFile } from '@vscode/fs/fs-consumer'

export const startCmd = async () => {
  startServer()

  // fsconsumer sample usage
  createTaskSolutionFile('contestName', 'taskName')

  vscode.window.showInformationMessage('start')
}
