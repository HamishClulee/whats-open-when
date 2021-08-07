"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthRoutes = void 0;
const express = require("express");
const QAuth = require("../controllers/Auth");
const auth = require("../config/passport");
const passport = require("passport");
const Environment_1 = require("../providers/Environment");
const Clean_1 = require("../middlewares/Clean");
const User_1 = require("../models/User");
const jwt = require('jsonwebtoken');
/** App Constants */
const PORT = 2900;
const DEV_URL = Environment_1.default.get().devUrl;
const PROD_URL = Environment_1.default.get().prodUrl;
const BASE_URL = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;
/**
 * Sets all contained routes at url prefix
 * ===> /auth
 *
 * @param app express.Application
 */
exports.setAuthRoutes = (app) => {
    const authRoutes = express.Router();
    authRoutes.post('/login', QAuth.login);
    authRoutes.post('/signup', QAuth.signup);
    authRoutes.post('/logout', QAuth.logout);
    authRoutes.post('/verify_email_token', QAuth.verifyemailtoken);
    authRoutes.post('/send_verify_email', auth.isReqAllowed, QAuth.sendverifyemail);
    authRoutes.post('/forgot', QAuth.forgotpassword);
    authRoutes.post('/reset', QAuth.resetpassword);
    // Helper for frontend, checks if session exists
    // if session => ensures JWT is granted
    // if session & JWT => returns the user linked to the session
    authRoutes.post('/user', QAuth.getuser);
    // Account settings
    authRoutes.post('/toggle_subscribe', auth.isReqAllowed, QAuth.togglesubscribe);
    authRoutes.post('/user_settings', auth.isReqAllowed, QAuth.usersettings);
    // Plumbing and Misc
    authRoutes.post('/contact', QAuth.contact);
    // Google
    authRoutes.get('/google', passport.authenticate('google', { scope: ['email'] }));
    authRoutes.get('/google/callback', passport.authenticate('google', {
        failureRedirect: `${BASE_URL}/?authRedirect=true`
    }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        /**
         * Google has returned the email address and verified it, log the user in
         * and grant them a token
         */
        const _user = yield User_1.User.findOne({ _id: req.user._id });
        if (_user)
            req.logIn(_user, (err) => {
                if (err)
                    return Clean_1.default.authError('login::passport::login-err', err, res);
                const tokenPayload = {
                    userid: _user._id,
                    email: _user.email,
                    role: _user.role
                };
                const token = jwt.sign(tokenPayload, Environment_1.default.get().tokenSecret, { expiresIn: `2 days` });
                // redirect to the FE component set to eat the token and deal with FE auth
                res.redirect(`${BASE_URL}/authcb?token=${token.split('.').join('~')}`);
            });
        else
            return Clean_1.default.authError('Passport Google Success CB', 'No user found when using findOe(req.user._id)', res);
    }));
    /**
     * ALL ROUTES IN THIS FILE MOUNTED AT /AUTH PREFIX
     */
    app.use('/auth', authRoutes);
};
//# sourceMappingURL=authRoutes.js.map