import * as vscode from 'vscode'
import { startServerCmd, closeServerCmd } from '@vscode/commands/server'
import { createStatusBarItem } from '@vscode/status-bar/status-bar'
import { showQuickPickCmd } from '@vscode/commands/quick-pick'
import { compileCmd } from '@vscode/commands/compile'
import { cmdId } from '@vscode/commands/id'

export function activate(context: vscode.ExtensionContext) {
  const startServerCmdDisposable = vscode.commands.registerCommand(cmdId.start, startServerCmd)

  const closeServerCmdDisposable = vscode.commands.registerCommand(cmdId.close, closeServerCmd)

  const showQuickPickCmdDisposable = vscode.commands.registerCommand(cmdId.pick, showQuickPickCmd)

  const compileCmdDisposable = vscode.commands.registerCommand(cmdId.compile, compileCmd)

  context.subscriptions.push(startServerCmdDisposable)
  context.subscriptions.push(closeServerCmdDisposable)
  context.subscriptions.push(showQuickPickCmdDisposable)
  context.subscriptions.push(compileCmdDisposable)
  context.subscriptions.push(createStatusBarItem(cmdId.start))
}

export function deactivate() {}
