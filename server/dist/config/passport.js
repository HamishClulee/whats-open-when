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
exports.isAdmin = exports.isAuthenticated = exports.isReqAllowed = void 0;
const passport = require("passport");
const passportLocal = require("passport-local");
const WelcomeEmail = require("../resources/emails/welcome");
const mongoose = require("mongoose");
const Environment_1 = require("../providers/Environment");
const jwt = require('jsonwebtoken');
const User_1 = require("../models/User");
const Clean_1 = require("../middlewares/Clean");
const LocalStrategy = passportLocal.Strategy;
const SendGrid = require('@sendgrid/mail');
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    if (mongoose.Types.ObjectId.isValid(id))
        User_1.User.findById(id, (err, user) => { done(err, user); });
    else {
        const _user = new User_1.User();
        _user.save();
    }
});
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User_1.User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err)
            return done(err, null);
        if (!user)
            return done(undefined, false, { message: `Email ${email} not found.` });
        user.comparePassword(password, (err, isMatch) => {
            if (err)
                return done(err, null);
            if (isMatch)
                return done(null, user);
            return done(null, null, { message: 'Invalid email or password.' });
        });
    });
}));
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: Environment_1.default.get().googleClientId,
    clientSecret: Environment_1.default.get().googleSecret,
    callbackURL: `${Environment_1.default.get().baseUrl}/auth/google/callback`
}, (req, accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * => Get email from profile
     * => Check if email exists in Users table
     * => If user exists => log them in (grant token and session)
     * => If no User exists => Save new User => log them in (grant token and session)
     */
    User_1.User.findOne({ email: profile.emails[0].value }, (err, existingUser) => {
        // User exists, return it
        if (!err && existingUser)
            return done(false, existingUser);
        // No User, create one
        else if (!err && !existingUser) {
            const token = require('crypto').randomBytes(Math.ceil(64 / 2)).toString('hex');
            const newUser = new User_1.User({
                email: profile.emails[0].value,
                password: null,
                emailVerifyToken: token
            });
            newUser.save((err) => {
                if (!err) {
                    /**
                     * Send the Welcome to email to the new user
                     */
                    SendGrid.setApiKey(Environment_1.default.get().sendGridSecret);
                    SendGrid.send({
                        to: newUser.email,
                        from: 'noreply@welcomeqr.codes',
                        subject: 'A warm welcome from Welcome QR Codes',
                        html: WelcomeEmail.build(`${Environment_1.default.get().baseUrl}/account?token=${token}`)
                    });
                    return done(null, newUser);
                }
                else
                    return done(err, null);
            });
        }
        else
            return done(err, null);
    });
})));
exports.isReqAllowed = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // No token exists but a session does exist
    // => grant user a token
    if (token == null && req.isAuthenticated())
        next();
    // No session, No Token
    // => deny/kill user
    else if (token === null && !req.isAuthenticated())
        return Clean_1.default.deny(res, 403, 'token === null && !req.isAuthenticated()');
    // session and token exist
    // => verify token
    else if (token && req.isAuthenticated())
        jwt.verify(token, Environment_1.default.get().tokenSecret, (err, user) => {
            if (err)
                return Clean_1.default.deny(res, 403, 'token && req.isAuthenticated()');
            else
                next();
        });
    // No session no token no user
    // => deny
    else
        return Clean_1.default.deny(res, 403, 'No session, no token, no user');
};
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    else
        res.redirect('/?authRedirect=true');
};
exports.isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.isAuthenticated()) {
        const user = yield User_1.User.findOne({ _id: req.user });
        if (user && user.role === 'ADMIN')
            next();
        else
            return Clean_1.default.deny(res, 406, 'Admin user not found');
    }
    else
        return Clean_1.default.deny(res, 406, 'Final block in isAdmin.');
});
//# sourceMappingURL=passport.js.map