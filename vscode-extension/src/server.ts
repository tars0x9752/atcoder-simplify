import * as fastify from 'fastify'
import * as cors from 'fastify-cors'
import { SampleCasePayload } from '@shared/types/sample-case-payload'
import { createTaskRelatedFiles } from '@vscode/fs/contest'

export const startServer = () => {
  const server = fastify().register(cors, {
    origin: 'https://atcoder.jp',
  })

  server.post('/', async (req, res) => {
    console.log('posted')

    const sapmleCases = req.body as SampleCasePayload

    createTaskRelatedFiles(sapmleCases)

    res.send('ok')
  })

  server.listen(20080, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`server listening on ${address}`)
  })
}
