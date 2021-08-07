"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const compression = require("compression");
const session = require("express-session");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");
const cors = require("cors");
const redis = require("redis");
const lusca = require("lusca");
const passport = require("passport");
const adminRoutes = require("../routes/adminRoutes");
const authRoutes = require("../routes/authRoutes");
/** Middlewares */
const Environment_1 = require("./Environment");
const jwt = require('jsonwebtoken');
/** App Constants */
const PORT = Environment_1.default.get().port;
const DEV_URL = Environment_1.default.get().devUrl;
const PROD_URL = Environment_1.default.get().prodUrl;
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient();
class Express {
    constructor() {
        this.app = express();
    }
    init() {
        this.app.set('port', PORT);
        this.app.use(compression());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(session({
            cookie: {
                sameSite: process.env.NODE_ENV === 'production' ? true : false,
                maxAge: 1000 * 60 * 60 * 24 // One Day
            },
            saveUninitialized: true,
            resave: true,
            secret: Environment_1.default.get().sessionSecret,
            store: new RedisStore({ client: redisClient })
        }));
        if (process.env.NODE_ENV === 'production')
            this.app.set('trust proxy', 1);
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        // Middleware
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
            next();
        });
        /**
         * CORS --
         * In Prod => allow from google and production domain
         * In Dev => allow from google and the local host ports used in dev
         * Dev is probably okay to just be * but ¯\_(ツ)_/¯
         */
        this.app.use(cors({
            origin: process.env.NODE_ENV !== 'production' ?
                [DEV_URL, '/\.google.com\.com$/']
                : [PROD_URL, '/\.google.com\.com$/'],
            credentials: true
        }));
        if (process.env.NODE_ENV === 'production') {
            this.app.use(lusca.xframe('SAMEORIGIN'));
            this.app.use(lusca.xssProtection(true));
        }
        /** ---------------------------------------  APP ROUTING  --------------------------------- */
        // ==> /auth
        authRoutes.setAuthRoutes(this.app);
        // ==> /admin
        adminRoutes.setAdminRoutes(this.app);
        /** -------------------------------  STATIC FILES AND SPA SERVER  --------------------------------- */
        this.app.use('/', express.static(path.join(__dirname, '../../dist/front-end')));
        this.app.use(history({
            verbose: true,
            disableDotRule: true
        }));
        this.app.get('*', express.static(path.join(__dirname, '../../dist/front-end')));
        this.app.listen(PORT, () => {
            return console.log(`Server :: Running @ 'http://localhost:${PORT}' :: in ${process.env.NODE_ENV} mode`);
        });
    }
}
exports.default = new Express();
//# sourceMappingURL=Express.js.map