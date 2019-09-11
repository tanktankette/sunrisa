const Serial = require('./serial_communication')
const express = require('express')
const app = express()
const port = 3000

const serial = new Serial('/dev/serial0', 57600, console.log)

app.get('/', (req, res) => {
  serial.addToQueue('SF,1,A', console.log)
  res.send('Hello World!')
})

app.get('/on', (req, res) => {
  serial.addToQueue('SN,1,A', console.log)
  res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
