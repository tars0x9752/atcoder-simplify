import * as vscode from 'vscode'
import { EXT_NAME } from '@vscode/env'

class TerminalConsumer {
  _terminal: vscode.Terminal | null

  constructor() {
    this._terminal = null
  }

  get active() {
    return this._terminal !== null
  }

  create() {
    const { _terminal } = this

    if (_terminal === null) {
      this._terminal = vscode.window.createTerminal(EXT_NAME)
    }
  }

  dispose() {
    const { _terminal } = this

    _terminal?.dispose()
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
