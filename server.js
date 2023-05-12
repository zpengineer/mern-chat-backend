const httpServer = require('./app')
const mongoose = require('mongoose')

const { MONGODB_URI, PORT } = process.env

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('Database connection successful')
		httpServer.listen(PORT, () => {
			console.log(`Server running. Use our API on port: ${PORT}`)
		})
	})
	.catch(error => {
		console.log(error)
		process.exit(1)
	})
