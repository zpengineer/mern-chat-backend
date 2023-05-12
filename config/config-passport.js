const passport = require('passport')
const passportJWT = require('passport-jwt')
const User = require('../models/user')
require('dotenv').config()

const { SECRET_KEY } = process.env

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const opt = {
	secretOrKey: SECRET_KEY,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
	new JwtStrategy(opt, function (payload, done) {
		User.find({ _id: payload.id })
			.then(([user]) => {
				if (!user) {
					return done(new Error('User not found'))
				}
				return done(null, user)
			})
			.catch(err => done(err))
	})
)
