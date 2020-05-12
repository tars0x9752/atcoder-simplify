import * as vscode from 'vscode'
import { ServerState } from '@vscode/server/server'

const statusBarText = {
  [ServerState.Stopped]: `$(run) AtCoder Simplify`,
  [ServerState.Running]: `$(zap) AtCoder Simplify`,
}

const initStatusBar = () => {
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0)

  const createStatusBarItem = (cmdId?: string) => {
    statusBarItem.text = statusBarText[ServerState.Stopped]
    statusBarItem.command = cmdId
    statusBarItem.show()

    return statusBarItem
  }

  const updateStatusBarItem = (state: ServerState, cmdId?: string) => {
    statusBarItem.text = statusBarText[state]

    if (cmdId !== undefined) {
      statusBarItem.command = cmdId
    }

    statusBarItem.show()
  }

  return {
    createStatusBarItem,
    updateStatusBarItem,
  }
}

export const { createStatusBarItem, updateStatusBarItem } = initStatusBar()
