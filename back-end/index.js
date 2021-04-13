;(async () => {
  try {
    const express = require('express')

    const app = express()

    app.use(express.json())

    app.use('/', require('./src/routes/index.js'))

    const db = require('./config/db')
    try {
      await db.sync()
    } catch (error) {
      console.log(error)
    }

    app.listen(3000, () => {
      console.log('Server iniciado.. http://localhost:3000')
    })
  } catch (error) {
    console.log(error)
  }
})()
