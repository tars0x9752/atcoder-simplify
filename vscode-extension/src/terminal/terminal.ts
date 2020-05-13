import * as vscode from 'vscode'
import { EXT_NAME } from '@vscode/env'

class TerminalConsumer {
  _terminal: vscode.Terminal | null

  constructor() {
    this._terminal = null
  }

  get active() {
    const { _terminal } = this

    return _terminal?.exitStatus === undefined
  }

  create() {
    const { active } = this

    // activeならなにもしない
    if (active) {
      return
    }

    this._terminal = vscode.window.createTerminal(EXT_NAME)
  }

  dispose() {
    const { _terminal } = this

    _terminal?.dispose()

    this._terminal = null
  }

  sendText(text: string, addNewLine?: boolean) {
    const { _terminal } = this

    _terminal?.sendText(text, addNewLine)
  }

  show(preservFocus?: boolean) {
    this._terminal?.show(preservFocus)
  }

  hide() {
    this._terminal?.hide()
  }
}

export const terminal = new TerminalConsumer()
