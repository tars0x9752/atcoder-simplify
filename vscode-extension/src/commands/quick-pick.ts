import * as vscode from 'vscode'
import { startServerCmd, closeServerCmd } from '@vscode/commands/server'
import { server, ServerState } from '@vscode/server/server'
import { posix } from 'path'
import { testCmd } from '@vscode/commands/test'

const DELIMITER = ': '

const quickPickItemText = {
  start: `[Start]${DELIMITER}AtCoder Simplify を起動します`,
  close: `[Close]${DELIMITER}AtCoder Simplify を停止します`,
  test: `[Test]${DELIMITER}サンプルケースをテストします`,
  compile: `[Compile]${DELIMITER}-o オプションのみの簡易コンパイルを行います(gccが必要です)`,
}

const quickPickItemCmd: Record<string, () => void> = {
  start: startServerCmd,
  close: closeServerCmd,
  test: testCmd,
  compile: () => undefined,
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
