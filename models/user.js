const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Email is required'],
		},
		token: {
			type: String,
			default: null,
		},
		chatrooms: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Chatroom',
			},
		],
		privateMessages: [
			{
				type: Schema.Types.ObjectId,
				ref: 'PrivateMessage',
			},
		],
	},
	{ versionKey: false, timestamps: true }
)

userSchema.methods.setPassword = function (password) {
	const salt = bcrypt.genSaltSync(10)
	this.password = bcrypt.hashSync(password, salt)
}

userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
