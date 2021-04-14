;(async () => {
  try {
    const express = require('express')

    const app = express()

    app.use(express.json())

    const cors = require('cors')
    var corsOptions = {
      origin: '*'
    }
    app.use(cors(corsOptions))

    app.use('/', require('./src/routes/index.js'))

    // const db = require('./config/db')
    // await db.sync()

    app.listen(3000, () => {
      console.log('Server iniciado.. http://localhost:3000')
    })
  } catch (error) {
    console.log(error)
  }
})()
