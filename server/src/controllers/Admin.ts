'use strict'
import { IResponse, IRequest } from '../interfaces'
import Clean from '../middlewares/Clean'
import Log from '../middlewares/Log'

const fs = require('fs')
const path = require('path')

const ensureTwoDigits = (term: number, offset = false): string => {
	term = offset ? (term + 1) : term
	return ('0' + term).slice(-2)
}

export const getLogByDay = (req: IRequest, res: IResponse) => {

	try {

		let day
		let today = new Date()

		if (!req.body.day) {
			day = `${today.getFullYear()}-${ensureTwoDigits(today.getMonth(), true)}-${ensureTwoDigits(today.getDate())}`
		} else {
			day = req.body.day
		}

		let filePath = path.join(__dirname, `../../.logs/${day}.log`)
		let stat = fs.statSync(filePath)

		fs.readFile(filePath, 'utf8', function(err, data) {

			if (err) { throw err }

			const raw = data.split(/\r?\n/)

			const cleaned = raw.filter(line => {
				return line != null && line !== ''
			})

			Clean.success(res, 200, cleaned, `Logs for given day`)
		})

	} catch (e) {

		return Clean.apiError('getLogByDay', e, res)

	}
}

export const getAllLogFilenames = (req: IRequest, res: IResponse) => {

	try {

		const logs = []

		fs.readdir(path.join(__dirname, `../../.logs/`), function (err, files) {

			if (err) {
				return console.log('Unable to scan directory: ' + err)
			}

			files.forEach(function (file) {
				logs.push(file.slice(0, -4))
			})

			Clean.success(res, 200, logs, `All log file names`)
		})

	} catch (e) {

		return Clean.apiError('getAllLogFilenames', e, res)

	}

}

export const newClientSideError = (req: IRequest, res: IResponse) => {

	try {

		Log.client('test', JSON.stringify(req.body.errdeets))

	} catch (e) {

		return Clean.apiError('getAllLogFilenames', e, res)

	}

}
