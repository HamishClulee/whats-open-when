'use strict';
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
exports.contact = exports.usersettings = exports.forgotpassword = exports.resetpassword = exports.verifyemailtoken = exports.sendverifyemail = exports.togglesubscribe = exports.getuser = exports.logout = exports.signup = exports.login = void 0;
const validate = require("express-validator");
const passport = require("passport");
const WelcomeEmail = require("../resources/emails/welcome");
const ResetEmail = require("../resources/emails/resetconfirm");
const ForgotPassword = require("../resources/emails/forgot");
const VerifyEmail = require("../resources/emails/verifyemail");
const User_1 = require("../models/User");
const Environment_1 = require("../providers/Environment");
const Clean_1 = require("../middlewares/Clean");
const SendGrid = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    validate.check('email', 'E-mail cannot be blank').notEmpty();
    validate.check('email', 'E-mail is not valid').isEmail();
    validate.check('password', 'Password cannot be blank').notEmpty();
    validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 });
    const errors = validate.validationResult(req);
    if (!errors.isEmpty())
        return Clean_1.default.authError('login', `Validation error: ${String(errors)}`, res);
    try {
        /**
         * I think passport and the try catch should be enough to catch the case where a user
         * who has signed up with an OAuth provided, and there fore doesnt have a password,
         * tries to log in using a password.
         * => time will tell.
         */
        passport.authenticate('local', (err, user, info) => {
            if (err)
                return Clean_1.default.authError('login::passport::err', err, res);
            if (!user)
                return Clean_1.default.authError('login::passport::no-user', err, res);
            req.logIn(user, (err) => {
                if (err)
                    return Clean_1.default.authError('login::passport::login-err', err, res);
                return Clean_1.default.approve(res, 200, user, '[QAuth login] req.logIn called successfully');
            });
        })(req, res);
    }
    catch (e) {
        return Clean_1.default.authError('login', `caught error: ${e}`, res);
    }
});
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    validate.check('email', 'E-mail cannot be blank').notEmpty();
    validate.check('email', 'E-mail is not valid').isEmail();
    validate.check('password', 'Password cannot be blank').notEmpty();
    validate.check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 });
    const errors = validate.validationResult(req);
    if (!errors.isEmpty())
        return Clean_1.default.authError('login', `Validation error: ${errors.array()}`, res);
    try {
        const existingUser = yield User_1.User.findOne({ email: req.body.email });
        /**
         * Primary use case for sign ups; the user doesnt exist
         * => sign them up, send a welcome email, add to the db and log them in
         */
        if (!existingUser) {
            const token = require('crypto').randomBytes(Math.ceil(64 / 2)).toString('hex');
            const user = new User_1.User({
                email: req.body.email,
                password: req.body.password,
                emailVerifyToken: token
            });
            const _user = yield user.save();
            req.logIn(_user, (err) => {
                if (err)
                    return Clean_1.default.authError('login::passport::login-err', err, res);
                SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
                SendGrid.send({
                    to: _user.email,
                    from: 'noreply@welcomeqr.codes',
                    subject: 'A warm welcome from Welcome QR Codes',
                    html: WelcomeEmail.build(`${Environment_1.default.get().baseUrl}/account?token=${token}`)
                });
                return Clean_1.default.approve(res, 200, _user);
            });
            /**
             * User has an active session and a password set, meaning they have already signed up and logged in
             * => send approval and user details
             */
        }
        else if (req.user && existingUser && existingUser.password)
            return Clean_1.default.approve(res, 200, existingUser);
        /**
         * User exists and has a password, meaning they have already signed up previously, but dont currently have a session
         * => grant the user a new session
         */
        else if (!req.user && existingUser && existingUser.password)
            req.logIn(existingUser, (err) => {
                if (err)
                    return Clean_1.default.authError('login::passport::login-err', err, res);
                return Clean_1.default.approve(res, 200, existingUser);
            });
        /**
         * User exists from an OAuth login/signup, but doesnt have a password set so cant use a password to login
         * => set password in db and grant user a session
         */
        else {
            const updatedUser = yield User_1.User.findOneAndUpdate({ email: req.body.email }, { password: req.body.password }, { new: true });
            req.logIn(updatedUser, (err) => {
                if (err)
                    return Clean_1.default.authError('login::passport::login-err', err, res);
                return Clean_1.default.approve(res, 200, updatedUser);
            });
        }
        // if execution reaches this point, something is seriously wrong
        // ¯\_(ツ)_/¯
    }
    catch (e) {
        return Clean_1.default.authError('signup', `caught error: ${e}`, res);
    }
});
exports.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield req.logout();
        return Clean_1.default.deny(res, 200);
    }
    catch (e) {
        return Clean_1.default.authError('logout', `caught error: ${e}`, res);
    }
});
exports.getuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return Clean_1.default.deny(res, 200, 'No session - no user');
        const user = yield User_1.User.findOne({ _id: req.user._id });
        if (user)
            return Clean_1.default.approve(res, 200, user, 'Auth success');
        return Clean_1.default.deny(res, 200, 'You do not exist');
    }
    catch (e) {
        return Clean_1.default.authError('session challenge', `caught error: ${e}`, res);
    }
});
exports.togglesubscribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return Clean_1.default.deny(res, 401, 'No user logged in');
        const user = yield User_1.User.findOneAndUpdate({ _id: req.user._id }, { allowEmails: req.body.subscribe }, { new: true });
        if (!user)
            return Clean_1.default.deny(res, 403, 'Account with that email address does not exist.');
        return Clean_1.default.success(res, 200, { allow: user.allowEmails }, user.allowEmails ? 'Sucessfully subscribed' : 'You are now unsubcribed from all emails');
    }
    catch (e) {
        return Clean_1.default.authError('toggle subscribe', `caught error: ${e}`, res);
    }
});
exports.sendverifyemail = (req, res, IResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ _id: req.user });
        if (!user)
            return Clean_1.default.deny(res, 401, 'No user exists.');
        if (user.emailVerified)
            return Clean_1.default.failure(res, 502, 'Email already verified');
        else if (user.emailVerifyToken) {
            SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
            SendGrid.send({
                to: user.email,
                from: 'noreply@welcomeqr.codes',
                subject: 'Please verify your email.',
                html: VerifyEmail.build(`${Environment_1.default.get().baseUrl}/verify-your-email?token=${user.emailVerifyToken}`)
            });
            return Clean_1.default.approve(res, 200, user);
        }
        else
            return Clean_1.default.failure(res, 502, 'No email verify token in db.');
    }
    catch (e) {
        return Clean_1.default.authError('verify email', `caught error: ${e}`, res);
    }
});
exports.verifyemailtoken = (req, res, IResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ emailVerifyToken: req.body.token });
        if (!user)
            return Clean_1.default.deny(res, 401, 'Verify token is invalid or has expired.');
        user.emailVerified = true;
        user.emailVerifyToken = 'verified';
        yield user.save();
        return Clean_1.default.approve(res, 200, user);
    }
    catch (e) {
        return Clean_1.default.authError('verifyemailtoken', `caught error: ${e}`, res);
    }
});
exports.resetpassword = (req, res, IResponse) => __awaiter(void 0, void 0, void 0, function* () {
    validate.check('password', 'Password must be at least 8 characters long.').isLength({ min: 8 }).run(req);
    validate.check('confirm', 'Passwords must match.').equals(req.body.password).run(req);
    const errors = validate.validationResult(req);
    if (!errors.isEmpty())
        return Clean_1.default.deny(res, 403, 'Validation error');
    try {
        const user = yield User_1.User.findOne({ passwordResetToken: req.body.token });
        if (!user)
            return Clean_1.default.deny(res, 401, 'No user.');
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        yield user.save();
        req.logIn(user, () => {
            SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
            SendGrid.send({
                to: user.email,
                from: 'noreply@welcomeqr.codes',
                subject: 'Password Changed Successfully',
                html: ResetEmail.build()
            });
        });
    }
    catch (e) {
        return Clean_1.default.authError('reset password', `caught error: ${e}`, res);
    }
});
exports.forgotpassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = require('crypto').randomBytes(Math.ceil(64 / 2)).toString('hex');
        const user = yield User_1.User.findOne({ email: req.body.email });
        if (!user)
            return Clean_1.default.deny(res, 403, 'No user.');
        user.passwordResetToken = token;
        yield user.save();
        SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
        SendGrid.send({
            to: user.email,
            from: 'noreply@welcomeqr.codes',
            subject: 'Reset your password on WelcomeQR Codes',
            html: ForgotPassword.build(`${Environment_1.default.get().baseUrl}/auth/reset?token=${token}`)
        });
        return Clean_1.default.approve(res, 200, user);
    }
    catch (e) {
        return Clean_1.default.authError('forgot password', `caught error: ${e}`, res);
    }
});
exports.usersettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.session.passport)
            return Clean_1.default.deny(res, 403, 'No user logged in.');
        const user = yield User_1.User.findOne({ _id: req.user._id });
        if (!user)
            return Clean_1.default.deny(res, 403, 'No user exists.');
        return Clean_1.default.settings(res, user);
    }
    catch (e) {
        return Clean_1.default.authError('user settings', `caught error: ${e}`, res);
    }
});
exports.contact = (req, res) => {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    SendGrid.send({
        to: Environment_1.default.get().internalEmail,
        from: 'contact@welcomeqr.codes',
        subject: 'New contact from Welcome QR',
        html: `
			<p><b>From:</b> ${req.body.name}</p>
			<p><b>Email:</b> ${req.body.email}</p>
			<p><b>Selected:</b> ${req.body.selectVal}</p>
			<p><b>Message:</b> ${req.body.message}</p>
		`
    });
    return Clean_1.default.success(res, 200);
};
//# sourceMappingURL=Auth.js.map