import * as vscode from 'vscode'
import { startServerCmd, closeServerCmd } from '@vscode/commands/server'
import { createStatusBarItem } from '@vscode/status-bar/status-bar'
import { showQuickPickCmd } from '@vscode/quick-pick/quick-pick'

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

  const showQuickPickCmdDisposable = vscode.commands.registerCommand(
    `${EXTENSION_ID}.pick`,
    showQuickPickCmd
  )

  context.subscriptions.push(startServerCmdDisposable)
  context.subscriptions.push(closeServerCmdDisposable)
  context.subscriptions.push(showQuickPickCmdDisposable)
  context.subscriptions.push(createStatusBarItem(`${EXTENSION_ID}.pick`))
}

export function deactivate() {}
