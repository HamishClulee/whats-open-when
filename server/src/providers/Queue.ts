import * as kue from 'kue'

import Env from './Environment'
import Log from '../middlewares/Log'

class Queue {
	public jobs: any

	constructor() {
		this.jobs = kue.createQueue({
			prefix: Env.get().redisPrefix,
			redis: {
				port: Env.get().redisHttpPort,
				host: Env.get().redisHttpHost,
				db:  Env.get().redisDB
			}
		})

		this.jobs
			.on('job enqueue', (_id, _type) => { /* nothing worth logging here yet */ })
			.on('job complete', (_id) => this.removeProcessedJob(_id))
	}

	public dispatch (_jobName: string, _args: object, _callback: Function): void {
		this.jobs.create(_jobName, _args).save()

		this.process(_jobName, 3, _callback)
	}

	private removeProcessedJob (_id): void {

		kue.Job.get(_id, (_err, _job) => {
			if (_err) { return }

			_job.remove((_err) => {
				if (_err) { throw _err }
			})
		})
	}

	private process (_jobName: string, _count: number, _callback: Function): void {
		this.jobs.process(_jobName, _count, (_job, _done) => {
			_done() // Notifies KUE about the completion of the job!

			_callback(_job.data)
		})
	}
}

export default new Queue
