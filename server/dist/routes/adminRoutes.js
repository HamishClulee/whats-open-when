"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAdminRoutes = void 0;
const auth = require("../config/passport");
const express = require("express");
const admin = require("../controllers/Admin");
/**
 * Sets all contained routes at url prefix
 * ===> /admin
 *
 * @param app express.Application
 */
exports.setAdminRoutes = (app) => {
    const adminRoutes = express.Router();
    adminRoutes.post('/get_log_by_day', auth.isAdmin, auth.isReqAllowed, admin.getLogByDay);
    adminRoutes.post('/get_all_log_filenames', auth.isAdmin, auth.isReqAllowed, admin.getAllLogFilenames);
    adminRoutes.post('/new_client_side_error', admin.newClientSideError);
    app.use('/admin', adminRoutes);
};
//# sourceMappingURL=adminRoutes.js.map