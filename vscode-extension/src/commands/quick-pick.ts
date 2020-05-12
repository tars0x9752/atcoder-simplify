import * as vscode from 'vscode'
import { startCmd, closeCmd } from '@vscode/commands/server'
import { server, ServerState } from '@vscode/server/server'
import { posix } from 'path'
import { testCmd } from '@vscode/commands/test'
import { EXT_NAME } from '@vscode/env'
import { compileCmd } from '@vscode/commands/compile'

const DELIMITER = ': '

const quickPickItemText = {
  start: `[Start]${DELIMITER}${EXT_NAME} を起動します`,
  close: `[Close]${DELIMITER}${EXT_NAME} を停止します`,
  test: `[Test]${DELIMITER}サンプルケースをテストします`,
  compile: `[Compile]${DELIMITER}gccで-oのみの簡易コンパイルを行います (⚠️gccが必要です)`,
}

const quickPickItemCmd: Record<string, () => void> = {
  start: startCmd,
  close: closeCmd,
  test: testCmd,
  compile: compileCmd,
}

const quickPickItemList = {
  stopped: [quickPickItemText.start],
  running: [quickPickItemText.close],
  editingCpp: [quickPickItemText.test, quickPickItemText.compile, quickPickItemText.close],
}

const getCurrentQuickPickItemList = (state: ServerState) => {
  if (state === ServerState.Stopped) {
    return quickPickItemList.stopped
  }

  const currentFileUri = vscode.window.activeTextEditor?.document.uri

  const isCpp = currentFileUri !== undefined && posix.extname(currentFileUri.path) === '.cpp'

  if (isCpp) {
    return quickPickItemList.editingCpp
  }

  return quickPickItemList.running
}

export const showQuickPickCmd = async () => {
  const list = getCurrentQuickPickItemList(server.state)

  const selected = await vscode.window.showQuickPick(list)

  if (selected === undefined) {
    return
  }

  const cmdKey = selected.match(/(?!\[)\w+(?=\])/g)![0].toLowerCase()

  quickPickItemCmd[cmdKey]()
}
