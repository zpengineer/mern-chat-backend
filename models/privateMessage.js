const { Schema, model } = require('mongoose')

const messageSchema = new Schema({
	chatroom: {
		type: Schema.Types.ObjectId,
		ref: 'Chatroom',
		required: true,
	},
	user: {
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

const Message = model('Message', messageSchema)

module.exports = Message
