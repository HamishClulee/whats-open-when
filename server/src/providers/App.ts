import * as kue from 'kue'
import * as path from 'path'
import * as dotenv from 'dotenv'

import Express from './Express'
import { Database } from './Database'

import Env from './Environment'
import Log from '../middlewares/Log'

class App {

	public loadConfiguration (): void {

		dotenv.config({ path: path.join(__dirname, '../../.env') })
	}

	public loadDatabase (): void {

		Database.init()
	}

	public loadServer (): void {

		Express.init()
	}

	public loadQueue (): void {
		const isQueueMonitorEnabled: boolean = Env.get().queueMonitor
		const queueMonitorPort: number = Env.get().queueMonitorHttpPort

		if (isQueueMonitorEnabled) {

			kue.app.listen(queueMonitorPort)

			console.log('\x1b[33m%s\x1b[0m', `Queue Monitor :: Running @ 'http://localhost:${queueMonitorPort}'`)
		}
	}
}

export default new App
