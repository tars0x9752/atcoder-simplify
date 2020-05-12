import * as vscode from 'vscode'
import { ServerState } from '@vscode/server/server'
import { EXT_NAME } from '@vscode/env'

const statusBarText = {
  [ServerState.Stopped]: `$(run) ${EXT_NAME}`,
  [ServerState.Running]: `$(zap) ${EXT_NAME}`,
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
