require('dotenv').config()

import express from 'express'
import proxy from 'http-proxy-middleware'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import jwt from 'express-jwt'
import db from './lib/db'
import lib from './lib'

const PORT = process.env.PORT || 6060
const BANKING_API_HOST = process.env.BANKING_API_HOST
const OAUTH_SIGNATURE = process.env.OAUTH_SIGNATURE

const jwtProtection = jwt({ secret: new Buffer(OAUTH_SIGNATURE, 'base64') })

const app = express()

// Proxy anything starting with `/api` to the banking api
app.use('/api', proxy({ target: BANKING_API_HOST, changeOrigin: true }))

// Now configure the rest
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'build')))

app.get('/ping', (req, res) => {
  return res.json({ status: 'pong' })
})

// Custom errors
app.use((err, req, res, next) => {
  console.log(err)

  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      result: {
        error: {
          message: err.message
        }
      }
    })
  } else {
    res.status(500).json({
      result: {
        error: {
          message: err.message
        }
      }
    })
  }
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

app.post('/payments', jwtProtection, async (req, res) => {
  try {
    await lib.payments.create({ params: req.body.payment })
    res.status(201).json({
      payment: req.body.payment
    })
  } catch (error) {
    res.status(400).json({
      result: {
        error: {
          message: error.message
        }
      }
    })
  }
})

app.get('/payments', jwtProtection, async (req, res) => {
  try {
    const { bkg: accountUid } = req.user
    const payments = await lib.payments.getAll(accountUid)

    res.status(200).json({
      payments
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      result: {
        error: {
          message: error.message
        }
      }
    })
  }
})

app.post('/payments/:paymentId/refund', jwtProtection, async (req, res) => {
  try {
    const { bkg: accountUid } = req.user
    const payment = await lib.payments.refund(accountUid, req.params.paymentId)

    res.status(200).json({
      payment
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      result: {
        error: {
          message: error.message
        }
      }
    })
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

// Connection mongodb
db.connect()
  .then(() => {
    app.listen(PORT)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

console.log(`Running on port ${PORT}`)
