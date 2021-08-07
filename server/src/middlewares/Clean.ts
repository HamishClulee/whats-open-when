import { UserDocument } from '../models/User'
import { IResponse } from '../interfaces'

import Env from '../providers/Environment'

import Log from './Log'

const jwt = require('jsonwebtoken')

interface AuthResponse {
	email: string | null,
	id: string | null,
	authed: boolean,
	role: string | null,
	tier: string | null,
	token: string | null,
}

interface SettingsResponse extends AuthResponse {
	allowsemails: boolean,
	isemailverified: boolean,
}

const generateAccessToken = (user: any) => {

	return jwt.sign(user, Env.get().tokenSecret, { expiresIn: `30 days` })

}

const Clean = {

	settings: function(res, user: UserDocument): SettingsResponse {

		Log.info(`Clean : Settings`, `Value of user email => ${user.email}`)

		return res.status(200).send({ user: this.buildSettings(user) })

	},

	deny: function(res: IResponse, status: number = 403, msg: string = ''): IResponse {

		let _user = this.killUser()

		Log.info(`Clean : Deny`, `Sending a ${status}, with message => ${msg}`)

		return res.status(status).send({ msg, user: _user })

	},

	approve: function(res: IResponse, status: number, user: any, msg: string = ''): IResponse {

		let _user = this.buildUser(user)

		Log.info(`Clean : Approve`, `Sending a ${status} to user => ${user.email}`)

		return res.status(status).send({ msg, user: _user })

	},

	success: function(res: IResponse, status: number, content: any = {}, msg: string = ''): IResponse {

		Log.info(`Clean : Success`, `Sending a ${status} with message ${msg}`)

		return res.status(status).send({ msg, content })

	},

	failure: function(res: IResponse, status: number, content: any = {}, msg: string = ''): IResponse {

		Log.info(`Clean : Failure`, `Sending a ${status} with message => ${msg}`)

		return res.status(status).send({ msg, content })

	},

	killUser: function(): AuthResponse {

		return {
			email: null,
			id: null,
			authed: false,
			role: null,
			tier: null,
			token: null
		}

	},

	buildUser: function(user: UserDocument): AuthResponse {

		return {
			email: user.email,
			id: user._id,
			authed: true,
			role: user.role,
			tier: user.accountTier,
			token: generateAccessToken({
				userid: user._id,
				email: user.email,
				role: user.role
			})
		}

	},

	buildSettings: function(user: UserDocument): SettingsResponse {

		return {
			email: user.email,
			id: user._id,
			authed: true,
			role: user.role,
			tier: user.accountTier,
			token: generateAccessToken({
				userid: user._id,
				email: user.email,
				role: user.role
			}),
			allowsemails: user.allowEmails,
			isemailverified: user.emailVerified
		}

	},

	apiError: function(funcname: string, error: Error, res: IResponse): IResponse {

		Log.error(`FnName: ${ funcname }`, `${String(error)} : Api Failure`, [Log.TAG_API_ERROR])

		return res.status(501).send({ userContent: `${String(error)} : Api Failure`, error })

	},

	authError: function(funcname: string, error: any, res: IResponse): IResponse {

		Log.error(`FnName: ${ funcname }`, `${String(error)} : User Auth Failure`, [Log.TAG_AUTH])

		return res.status(403).send({ userContent:  `${String(error)} : User Auth Failure`, error, user: this.killUser() })

	}

}

export default Clean
