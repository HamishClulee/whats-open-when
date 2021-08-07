import * as express from 'express'
import * as path from 'path'
import * as compression from 'compression'
import * as session from 'express-session'
import * as bodyParser from 'body-parser'
import * as history from 'connect-history-api-fallback'
import * as cors from 'cors'
import * as redis from 'redis'
import * as lusca from 'lusca'
import * as passport from 'passport'
import * as adminRoutes from '../routes/adminRoutes'
import * as authRoutes from '../routes/authRoutes'

/** Middlewares */
import Env from './Environment'

const jwt = require('jsonwebtoken')

/** App Constants */
const PORT = Env.get().port
const DEV_URL = Env.get().devUrl
const PROD_URL = Env.get().prodUrl

const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient()

class Express {
	public app: express.Application

	constructor () {
		this.app = express()
	}

	public init (): any {

		this.app.set('port', PORT)
		this.app.use(compression())
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({ extended: true }))

		this.app.use(session({
			cookie: {
				sameSite: process.env.NODE_ENV === 'production' ? true : false,
				maxAge: 1000 * 60 * 60 * 24 // One Day
			},
			saveUninitialized: true,
			resave: true,
			secret: Env.get().sessionSecret,
			store: new RedisStore({ client: redisClient })
		}))

		if (process.env.NODE_ENV === 'production') this.app.set('trust proxy', 1)

		this.app.use(passport.initialize())
		this.app.use(passport.session())

		// Middleware
		this.app.use((req, res, next) => {

			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST')

			next()
		})

		/**
		 * CORS --
		 * In Prod => allow from google and production domain
		 * In Dev => allow from google and the local host ports used in dev
		 * Dev is probably okay to just be * but ¯\_(ツ)_/¯
		 */
		this.app.use(cors({
			origin:
				process.env.NODE_ENV !== 'production' ?
					[DEV_URL, '/\.google.com\.com$/']
					: [PROD_URL, '/\.google.com\.com$/'],
			credentials: true
		}))

		if (process.env.NODE_ENV === 'production') {
			this.app.use(lusca.xframe('SAMEORIGIN'))
			this.app.use(lusca.xssProtection(true))
		}

		/** ---------------------------------------  APP ROUTING  --------------------------------- */

		// ==> /auth
		authRoutes.setAuthRoutes(this.app)

		// ==> /admin
		adminRoutes.setAdminRoutes(this.app)

		/** -------------------------------  STATIC FILES AND SPA SERVER  --------------------------------- */
		this.app.use('/', express.static(path.join(__dirname, '../../dist/front-end')))

		this.app.use(history({
			verbose: true,
			disableDotRule: true
		}))

		this.app.get('*', express.static(path.join(__dirname, '../../dist/front-end')))

		this.app.listen(PORT, () => {
			return console.log(`Server :: Running @ 'http://localhost:${PORT}' :: in ${process.env.NODE_ENV} mode`)
		})
	}
}

export default new Express()
