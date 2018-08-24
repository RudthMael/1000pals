require('dotenv').config()

import express from 'express'
import proxy from 'http-proxy-middleware'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import lib from './lib'

const PORT = process.env.PORT || 6060
const BANKING_API_HOST = process.env.BANKING_API_HOST

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/ping', (req, res) => {
  return res.json({ status: 'pong' })
})

app.post('/login', async (req, res) => {
  const code = req.body.code

  try {
    const result = await lib.login({ code })

    return res.json({
      access_token: result.access_token
    })
  } catch (error) {
    console.error(error)
    res.status(401).json({
      result: {
        error: {
          message: 'Invalid code.'
        }
      }
    })
  }
})

app.use('/api', proxy({ target: BANKING_API_HOST, changeOrigin: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT)

console.log(`Running on port ${PORT}`)
