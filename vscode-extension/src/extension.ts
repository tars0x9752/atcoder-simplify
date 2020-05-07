import * as vscode from 'vscode'
import { startServerCmd, closeServerCmd } from '@vscode/commands/server'
import { createStatusBarItem } from '@vscode/status-bar/status-bar'

const EXTENSION_ID = 'atcoderSimplify'

export function activate(context: vscode.ExtensionContext) {
  const startServerCmdDisposable = vscode.commands.registerCommand(
    `${EXTENSION_ID}.start`,
    startServerCmd
  )

  const closeServerCmdDisposable = vscode.commands.registerCommand(
    `${EXTENSION_ID}.close`,
    closeServerCmd
  )

  context.subscriptions.push(startServerCmdDisposable)
  context.subscriptions.push(closeServerCmdDisposable)
  context.subscriptions.push(createStatusBarItem())
}

export function deactivate() {}
