import * as vscode from 'vscode'
import { startServerCmd, closeServerCmd } from '@vscode/commands/server'

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
}

export function deactivate() {}
