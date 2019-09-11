const SerialPort = require('serialport')
const EventEmitter = require('events')

module.exports = class Serial {
  constructor (path, baudRate, readCallback) {
    this.queue = []
    this.emitter = new EventEmitter()
    this.serialPort = new SerialPort(path, { baudRate: baudRate })
    this.write = this.write.bind(this)
    this.emitter.on('ready', this.write)
    this.serialPort.on('data', this.read(readCallback))
  }

  addToQueue (data, callback) {
    const startQueue = this.queue.length === 0
    this.queue.push([data, callback])
    if (startQueue) {
      this.emitter.emit('ready')
    }
  }

  write () {
    if (this.queue.length === 0) return
    const [data, callback] = this.queue.shift()
    this.serialPort.write(data)
    this.serialPort.drain(callback)
    this.emitter.emit('ready')
  }

  read (callback) {
    callback(this.serialPort.read())
  }
}
