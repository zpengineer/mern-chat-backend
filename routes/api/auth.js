const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const router = express.Router()

const { SECRET_KEY } = process.env

router.post('/singup', async (req, res, next) => {
	const { fullName, email, password } = req.body
	const user = await User.findOne({ email })

	if (user) {
		return res.status(409).json({
			status: 'Error',
			code: 409,
			message: 'Email is already in use',
			data: 'Conflict',
		})
	}
	try {
		const newUser = new User({ fullName, email })
		newUser.setPassword(password)
		await newUser.save()

		return res.status(201).json({
			status: 'Success',
			code: 201,
			data: {
				message: 'Registration successful',
			},
		})
	} catch (error) {
		next(error)
	}
})

router.post('/singin', async (req, res, next) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })

	if (!user || !user.validPassword(password)) {
		return res.status(400).json({
			status: 'Error',
			code: 400,
			message: 'Incorrect login or password',
			data: 'Bad request',
		})
	}

	const payload = {
		id: user._id,
		fullName: user.fullName,
	}

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '30d' })

	await User.findByIdAndUpdate(user.id, { token })

	return res.json({
		status: 'Success',
		code: 200,
		data: {
			token,
		},
	})
})

module.exports = router
