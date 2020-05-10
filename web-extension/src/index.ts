import { SampleCasePayload } from '@shared/types/sample-case-payload'

const isInputSampleCaseEl = <T extends HTMLElement>(el: T) => {
  return el.parentElement?.querySelector('h3')?.textContent?.includes('入力例') ?? false
}

const isOutputSampleCaseEl = <T extends HTMLElement>(el: T) => {
  return el.parentElement?.querySelector('h3')?.textContent?.includes('出力例') ?? false
}

const accumelateSampleCases = <T extends HTMLElement>(acc: string[], curr: T) => {
  const sampleRawText = curr.textContent

  return sampleRawText !== null ? [...acc, sampleRawText] : [...acc]
}

const parseSampleCases = () => {
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
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  }

  const PORT = 20080

  fetch(`http://localhost:${PORT}`, {
    method: 'POST',
    headers,
    body,
  })
}

const validateSampleCases = (inputSampleCases: string[], outputSampleCases: string[]) => {
  if (inputSampleCases.length === 0 || outputSampleCases.length === 0) {
    return false
  }

  if (inputSampleCases.length !== outputSampleCases.length) {
    return false
  }

  return true
}

const runExtension = () => {
  const { inputSampleCases, outputSampleCases } = parseSampleCases()

  const { contestName, taskName } = parseTaskInfo()

  if (!validateSampleCases(inputSampleCases, outputSampleCases)) {
    return
  }

  sendSampleCases({
    contestName,
    taskName,
    inputSampleCases,
    outputSampleCases,
  })
}

window.onload = runExtension
