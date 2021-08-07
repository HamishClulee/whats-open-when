import * as express from 'express'
import * as QAuth from '../controllers/Auth'
import * as auth from '../config/passport'
import * as passport from 'passport'
import Env from '../providers/Environment'
import Clean from '../middlewares/Clean'
import { IRequest, IResponse } from '../interfaces'
import { User } from '../models/User'

const jwt = require('jsonwebtoken')

/** App Constants */
const PORT = 2900
const DEV_URL = Env.get().devUrl
const PROD_URL = Env.get().prodUrl
const BASE_URL = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL

/**
 * Sets all contained routes at url prefix
 * ===> /auth
 *
 * @param app express.Application
 */
export const setAuthRoutes = (app: express.Application): void => {

	const authRoutes = express.Router()

	authRoutes.post('/login', QAuth.login)
	authRoutes.post('/signup', QAuth.signup)
	authRoutes.post('/logout', QAuth.logout)
	authRoutes.post('/verify_email_token', QAuth.verifyemailtoken)
	authRoutes.post('/send_verify_email', auth.isReqAllowed, QAuth.sendverifyemail)
	authRoutes.post('/forgot', QAuth.forgotpassword)
	authRoutes.post('/reset', QAuth.resetpassword)

	// Helper for frontend, checks if session exists
	// if session => ensures JWT is granted
	// if session & JWT => returns the user linked to the session
	authRoutes.post('/user', QAuth.getuser)

	// Account settings
	authRoutes.post('/toggle_subscribe', auth.isReqAllowed, QAuth.togglesubscribe)
	authRoutes.post('/user_settings', auth.isReqAllowed, QAuth.usersettings)

	// Plumbing and Misc
	authRoutes.post('/contact', QAuth.contact)

	// Google
	authRoutes.get('/google', passport.authenticate('google', { scope: ['email'] }))

	authRoutes.get('/google/callback', passport.authenticate(
		'google',
		{
			failureRedirect: `${BASE_URL}/?authRedirect=true`
		}
	),
	async (req: IRequest, res: IResponse) => {

		/**
		 * Google has returned the email address and verified it, log the user in
		 * and grant them a token
		 */
		const _user = await User.findOne({ _id: req.user._id })

		if (_user) req.logIn(_user, (err) => {

			if (err) return Clean.authError('login::passport::login-err', err, res)

			const tokenPayload = {
				userid: _user._id,
				email: _user.email,
				role: _user.role
			}

			const token = jwt.sign(tokenPayload, Env.get().tokenSecret, { expiresIn: `2 days` })

			// redirect to the FE component set to eat the token and deal with FE auth
			res.redirect(`${BASE_URL}/authcb?token=${token.split('.').join('~')}`)

		})

		else return Clean.authError('Passport Google Success CB', 'No user found when using findOe(req.user._id)', res)

	})

	/**
	 * ALL ROUTES IN THIS FILE MOUNTED AT /AUTH PREFIX
	 */
	app.use('/auth', authRoutes)
}
