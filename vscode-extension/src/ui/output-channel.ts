import * as vscode from 'vscode'
import { EXT_NAME } from '@vscode/env'

export const outputChannel = vscode.window.createOutputChannel(EXT_NAME)
