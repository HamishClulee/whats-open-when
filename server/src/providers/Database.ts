import * as mongoose from 'mongoose'
import * as bluebird from 'bluebird'
import { MongoError } from 'mongodb'

import Env from './Environment'
import Log from '../middlewares/Log'

export class Database {
	public static init (): any {
		const dsn = Env.get().mongooseUrl
		const options = { useNewUrlParser: true, useUnifiedTopology: true };

		(<any>mongoose).Promise = bluebird

		mongoose.set('useCreateIndex', true)
		mongoose.set('useFindAndModify', false)

		mongoose.connect(dsn, options, (error: MongoError) => {

			if (error) {
				Log.error(`DataBaseError`, `Failed to connect to the Mongo server!!`)
				throw error
			}

		})
	}
}

export default mongoose
