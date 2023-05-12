const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
	cors: '*',
})

const userRouter = require('./routes/api/auth')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

require('./config/config-passport')

app.use('/api/auth', userRouter)

const connections = []

io.on('connection', socket => {
	console.log('User connected')

	connections.push(socket)

	socket.on('disconnect', () => {
		connections.splice(connections.indexOf(socket), 1)
		console.log('User disconnect')
	})

	socket.on('send mess', data => {
		io.sockets.emit('add mess', { mess: data.mess, name: data.name })
	})

	socket.on('typing', name => {
		socket.broadcast.emit('typing', name)
	})
})

module.exports = httpServer
