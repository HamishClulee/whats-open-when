import * as passport from 'passport'
import * as passportLocal from 'passport-local'
import * as WelcomeEmail from '../resources/emails/welcome'
import _ from 'lodash'

import * as mongoose from 'mongoose'

import Env from '../providers/Environment'
const jwt = require('jsonwebtoken')

import { User, UserDocument } from '../models/User'
import { IRequest, IResponse, INext } from '../interfaces'
import Log from '../middlewares/Log'
import Clean from '../middlewares/Clean'
import { readBufferWithDetectedEncoding } from 'tslint/lib/utils'

const LocalStrategy = passportLocal.Strategy

const SendGrid = require('@sendgrid/mail')

passport.serializeUser<any, any>((user, done) => {
	done(null, user.id)
})

passport.deserializeUser<any, any>((id, done) => {

	if (mongoose.Types.ObjectId.isValid(id)) User.findById(id, (err, user) => { done(err, user) })

	else {

		const _user = new User()
		_user.save()
	}
})

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

	User.findOne({ email: email.toLowerCase() }, (err, user: any) => {

		if (err) return done(err, null)

		if (!user) return done(undefined, false, { message: `Email ${email} not found.` })

		user.comparePassword(password, (err: Error, isMatch: boolean) => {

			if (err) return done(err, null)

			if (isMatch) return done(null, user)

			return done(null, null, { message: 'Invalid email or password.' })
		})

	})
}))

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.use(new GoogleStrategy(
	{
		clientID: Env.get().googleClientId,
		clientSecret: Env.get().googleSecret,
		callbackURL: `${Env.get().baseUrl}/auth/google/callback`
	},
	async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {

		/**
		 * => Get email from profile
		 * => Check if email exists in Users table
		 * => If user exists => log them in (grant token and session)
		 * => If no User exists => Save new User => log them in (grant token and session)
		 */

		User.findOne({ email: profile.emails[0].value }, (err, existingUser) => {

			// User exists, return it
			if (!err && existingUser) return done(false, existingUser)

			// No User, create one
			else if (!err && !existingUser) {

				const token = require('crypto').randomBytes(Math.ceil(64 / 2)).toString('hex')

				const newUser: UserDocument = new User({
					email: profile.emails[0].value,
					password: null,
					emailVerifyToken: token
				})

				newUser.save((err) => {

					if (!err) {

						/**
						 * Send the Welcome to email to the new user
						 */
						SendGrid.setApiKey(Env.get().sendGridSecret)

						SendGrid.send({
							to: newUser.email,
							from: 'noreply@welcomeqr.codes',
							subject: 'A warm welcome from Welcome QR Codes',
							html: WelcomeEmail.build(`${Env.get().baseUrl}/account?token=${token}`)
						})

						return done(null, newUser)

					} else return done(err, null)

				})

			} else return done(err, null)
		})
	})
)

export const isReqAllowed = (req: IRequest, res: IResponse, next: INext) => {

	const authHeader = req.headers['authorization']

	const token = authHeader && authHeader.split(' ')[1]

	// No token exists but a session does exist
	// => grant user a token
	if (token == null && req.isAuthenticated()) next()

	// No session, No Token
	// => deny/kill user
	else if (token === null && !req.isAuthenticated()) return Clean.deny(res, 403, 'token === null && !req.isAuthenticated()')

	// session and token exist
	// => verify token
	else if (token && req.isAuthenticated()) jwt.verify(token, Env.get().tokenSecret, (err: any, user: any) => {
		if (err) return Clean.deny(res, 403, 'token && req.isAuthenticated()')
		else next()
	})

	// No session no token no user
	// => deny
	else return Clean.deny(res, 403, 'No session, no token, no user')
}

export const isAuthenticated = (req: IRequest, res: IResponse, next: INext) => {

	if (req.isAuthenticated()) return next()
	else res.redirect('/?authRedirect=true')

}

export const isAdmin = async (req: IRequest, res: IResponse, next: INext) => {

	if (req.isAuthenticated()) {

		const user = await User.findOne({ _id: req.user })

		if (user && user.role === 'ADMIN') next()

		else return Clean.deny(res, 406, 'Admin user not found')

	} else return Clean.deny(res, 406, 'Final block in isAdmin.')
}
