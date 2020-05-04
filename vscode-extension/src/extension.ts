import * as vscode from 'vscode'
import { startCmd } from '@vscode/commands/start'

const EXTENSION_ID = 'atcoderSimplify'

export function activate(context: vscode.ExtensionContext) {
  const startCmdDisposable = vscode.commands.registerCommand(`${EXTENSION_ID}.start`, startCmd)

  context.subscriptions.push(startCmdDisposable)
}

export function deactivate() {}
