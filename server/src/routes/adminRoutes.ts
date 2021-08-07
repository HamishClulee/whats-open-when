import * as auth from '../config/passport'
import * as express from 'express'
import * as admin from '../controllers/Admin'

/**
 * Sets all contained routes at url prefix
 * ===> /admin
 *
 * @param app express.Application
 */
export const setAdminRoutes = (app: express.Application): void => {

	const adminRoutes = express.Router()

	adminRoutes.post('/get_log_by_day', auth.isAdmin, auth.isReqAllowed, admin.getLogByDay)
	adminRoutes.post('/get_all_log_filenames', auth.isAdmin, auth.isReqAllowed, admin.getAllLogFilenames)
	adminRoutes.post('/new_client_side_error', admin.newClientSideError)

	app.use('/admin', adminRoutes)
}
