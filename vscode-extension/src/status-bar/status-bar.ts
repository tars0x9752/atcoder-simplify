import * as vscode from 'vscode'
import { ServerState } from '@vscode/server/server'

const initStatusBar = () => {
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0)

  const createStatusBarItem = (cmdId?: string) => {
    statusBarItem.text = '$(run) AtCoder Simplify'
    statusBarItem.command = cmdId
    statusBarItem.show()

    return statusBarItem
  }

  const updateStatusBarItem = (state: ServerState) => {
    const icon = state === ServerState.Running ? 'zap' : 'run'

    statusBarItem.text = `$(${icon}) AtCoder Simplify`

    statusBarItem.show()
  }

  return {
    createStatusBarItem,
    updateStatusBarItem,
  }
}

export const { createStatusBarItem, updateStatusBarItem } = initStatusBar()
