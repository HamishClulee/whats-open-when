"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Environment_1 = require("../providers/Environment");
const Log_1 = require("./Log");
const jwt = require('jsonwebtoken');
const generateAccessToken = (user) => {
    return jwt.sign(user, Environment_1.default.get().tokenSecret, { expiresIn: `30 days` });
};
const Clean = {
    settings: function (res, user) {
        Log_1.default.info(`Clean : Settings`, `Value of user email => ${user.email}`);
        return res.status(200).send({ user: this.buildSettings(user) });
    },
    deny: function (res, status = 403, msg = '') {
        let _user = this.killUser();
        Log_1.default.info(`Clean : Deny`, `Sending a ${status}, with message => ${msg}`);
        return res.status(status).send({ msg, user: _user });
    },
    approve: function (res, status, user, msg = '') {
        let _user = this.buildUser(user);
        Log_1.default.info(`Clean : Approve`, `Sending a ${status} to user => ${user.email}`);
        return res.status(status).send({ msg, user: _user });
    },
    success: function (res, status, content = {}, msg = '') {
        Log_1.default.info(`Clean : Success`, `Sending a ${status} with message ${msg}`);
        return res.status(status).send({ msg, content });
    },
    failure: function (res, status, content = {}, msg = '') {
        Log_1.default.info(`Clean : Failure`, `Sending a ${status} with message => ${msg}`);
        return res.status(status).send({ msg, content });
    },
    killUser: function () {
        return {
            email: null,
            id: null,
            authed: false,
            role: null,
            tier: null,
            token: null
        };
    },
    buildUser: function (user) {
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
        };
    },
    buildSettings: function (user) {
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
        };
    },
    apiError: function (funcname, error, res) {
        Log_1.default.error(`FnName: ${funcname}`, `${String(error)} : Api Failure`, [Log_1.default.TAG_API_ERROR]);
        return res.status(501).send({ userContent: `${String(error)} : Api Failure`, error });
    },
    authError: function (funcname, error, res) {
        Log_1.default.error(`FnName: ${funcname}`, `${String(error)} : User Auth Failure`, [Log_1.default.TAG_AUTH]);
        return res.status(403).send({ userContent: `${String(error)} : User Auth Failure`, error, user: this.killUser() });
    }
};
exports.default = Clean;
//# sourceMappingURL=Clean.js.map