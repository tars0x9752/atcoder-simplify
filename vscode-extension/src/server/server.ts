import * as fastify from 'fastify'
import * as cors from 'fastify-cors'
import { SampleCasePayload } from '@shared/types/sample-case-payload'
import { createTaskRelatedFiles } from '@vscode/fs/contest'

export enum ServerState {
  Running,
  Stopped,
}

class ServerConsumer {
  private _server: fastify.FastifyInstance | false

  constructor() {
    this._server = false
  }

  get state() {
    return this._server === false ? ServerState.Stopped : ServerState.Running
  }

  private createServer() {
    const server = fastify().register(cors, {
      origin: 'https://atcoder.jp',
    })

    server.post('/', async (req, res) => {
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

    return server
  }

  start() {
    const { state, createServer } = this

    // start済みなら何もしない
    if (state === ServerState.Running) {
      return false
    }

    this._server = createServer()

    return true
  }

  async close() {
    const { _server, state } = this

    // startされていないなら何もしない
    if (state === ServerState.Stopped) {
      return false
    }

    // 上のガードでfastify.FastifyInstanceなことは保証されている
    await (_server as fastify.FastifyInstance).close()

    this._server = false

    return true
  }
}

export const server = new ServerConsumer()
