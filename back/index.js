import { Serial } from 'serial_communication.js'
const express = require('express')
const app = express()
const port = 3000

const serial = new Serial('/dev/serial0', 57600, console.log)

app.get('/', (req, res) => {
  serial.addToQueue('SF,2,A', console.log)
  res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
