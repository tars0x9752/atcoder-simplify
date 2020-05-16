import * as vscode from 'vscode'
import { startCmd, closeCmd } from '@vscode/commands/server'
import { createStatusBarItem } from '@vscode/ui/status-bar'
import { showQuickPickCmd } from '@vscode/commands/quick-pick'
import { testCmd } from '@vscode/commands/test'
import { cmdId } from '@vscode/commands/id'
import { compileCmd } from './commands/compile'

export function activate(context: vscode.ExtensionContext) {
  const startCmdDisposable = vscode.commands.registerCommand(cmdId.start, startCmd)

  const closeCmdDisposable = vscode.commands.registerCommand(cmdId.close, closeCmd)

  const showQuickPickCmdDisposable = vscode.commands.registerCommand(cmdId.pick, showQuickPickCmd)

  const testCmdDisposable = vscode.commands.registerCommand(cmdId.test, testCmd)

  const compileCmdDisposable = vscode.commands.registerCommand(cmdId.compile, compileCmd)

  context.subscriptions.push(startCmdDisposable)
  context.subscriptions.push(closeCmdDisposable)
  context.subscriptions.push(showQuickPickCmdDisposable)
  context.subscriptions.push(testCmdDisposable)
  context.subscriptions.push(compileCmdDisposable)
  context.subscriptions.push(createStatusBarItem(cmdId.start))
}

export function deactivate() {}
