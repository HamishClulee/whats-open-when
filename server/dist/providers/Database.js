"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const Environment_1 = require("./Environment");
const Log_1 = require("../middlewares/Log");
class Database {
    static init() {
        const dsn = Environment_1.default.get().mongooseUrl;
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        mongoose.Promise = bluebird;
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
        mongoose.connect(dsn, options, (error) => {
            if (error) {
                Log_1.default.error(`DataBaseError`, `Failed to connect to the Mongo server!!`);
                throw error;
            }
        });
    }
}
exports.Database = Database;
exports.default = mongoose;
//# sourceMappingURL=Database.js.map