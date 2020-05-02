// 規模的にファイル一つで tsc だけでもいいかと思ったけど型を共通化するならやっぱ webpack 要りそう
import { SampleCasePayload } from '@shared-types/sample-case-payload'

export const isInputSampleCaseEl = <T extends HTMLElement>(el: T) => {
  return el.parentElement?.querySelector('h3')?.textContent?.includes('入力例') ?? false
}

export const isOutputSampleCaseEl = <T extends HTMLElement>(el: T) => {
  return el.parentElement?.querySelector('h3')?.textContent?.includes('出力例') ?? false
}

export const accumelateSampleCases = <T extends HTMLElement>(acc: string[], curr: T) => {
  const sampleRawText = curr.textContent

  return sampleRawText !== null ? [...acc, sampleRawText] : [...acc]
}

export const parseSampleCases = () => {
  const preElNodeList = window.document.querySelectorAll('pre')

  const preElArray = Array.from(preElNodeList)

  const inputSampleCases = preElArray
    .filter(isInputSampleCaseEl)
    .reduce<string[]>(accumelateSampleCases, [])

  const outputSampleCases = preElArray
    .filter(isOutputSampleCaseEl)
    .reduce<string[]>(accumelateSampleCases, [])

  return {
    inputSampleCases,
    outputSampleCases,
  }
}

const parseTaskInfo = () => {
  const [, , contestName, , taskName] = window.location.pathname.split('/')

  return { contestName, taskName }
}

const sendSampleCases = (payload: SampleCasePayload) => {
  const body = JSON.stringify(payload)

  const PORT = 202080

  // クロスオリジンだけどpostだけできればよくて、そもそもレスポンスは要らないのでno-corsでよい
  fetch(`http://localhost:${PORT}`, {
    mode: 'no-cors',
    method: 'post',
    body,
  })
}

const runExtension = () => {
  const { inputSampleCases, outputSampleCases } = parseSampleCases()

  const { contestName, taskName } = parseTaskInfo()

  sendSampleCases({
    contestName,
    taskName,
    inputSampleCases,
    outputSampleCases,
  })
}

window.onload = runExtension

// 勢いで書いたけど使うかわからない
const zipSampleCases = (inputSampleCases: string[], outputSampleCases: string[]) => {
  if (inputSampleCases.length !== outputSampleCases.length) {
    console.error('something went wrong')
    return
  }

  const sampleCases = inputSampleCases.map((v, i) => {
    return {
      input: v,
      output: outputSampleCases[i],
    }
  })

  sampleCases.map((v, i) => {
    console.log(`=== sample ${i + 1} ===\n[input]\n${v.input}\n[output]\n${v.output}\n\n`)
  })
}
