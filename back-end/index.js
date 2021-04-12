const express = require('express')

const app = express()

app.use(express.json())

app.use('/', require('./src/routes/index.js'))

app.listen(3000, () => {
  console.log('Server iniciado.. http://localhost:3000')
})
