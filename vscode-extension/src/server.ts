import * as fastify from 'fastify'

export interface SampleCasePayload {
  contestName: string
  taskName: string
  inputSampleCases: string[]
  outputSampleCases: string[]
}

export const startServer = () => {
  const server = fastify({})

  server.post('/', async (req, res) => {
    console.log('posted')

    const sapmleCases = req.body as SampleCasePayload

    console.log(sapmleCases)

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
