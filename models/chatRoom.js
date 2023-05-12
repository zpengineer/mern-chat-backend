const { Schema, model } = require('mongoose')

const privateMessageSchema = new Schema({
	sender: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	recipient: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
})

const PrivateMessage = model('PrivateMessage', privateMessageSchema)

module.exports = PrivateMessage
