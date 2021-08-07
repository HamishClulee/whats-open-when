'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.newClientSideError = exports.getAllLogFilenames = exports.getLogByDay = void 0;
const Clean_1 = require("../middlewares/Clean");
const Log_1 = require("../middlewares/Log");
const fs = require('fs');
const path = require('path');
const ensureTwoDigits = (term, offset = false) => {
    term = offset ? (term + 1) : term;
    return ('0' + term).slice(-2);
};
exports.getLogByDay = (req, res) => {
    try {
        let day;
        let today = new Date();
        if (!req.body.day) {
            day = `${today.getFullYear()}-${ensureTwoDigits(today.getMonth(), true)}-${ensureTwoDigits(today.getDate())}`;
        }
        else {
            day = req.body.day;
        }
        let filePath = path.join(__dirname, `../../.logs/${day}.log`);
        let stat = fs.statSync(filePath);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            const raw = data.split(/\r?\n/);
            const cleaned = raw.filter(line => {
                return line != null && line !== '';
            });
            Clean_1.default.success(res, 200, cleaned, `Logs for given day`);
        });
    }
    catch (e) {
        return Clean_1.default.apiError('getLogByDay', e, res);
    }
};
exports.getAllLogFilenames = (req, res) => {
    try {
        const logs = [];
        fs.readdir(path.join(__dirname, `../../.logs/`), function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            files.forEach(function (file) {
                logs.push(file.slice(0, -4));
            });
            Clean_1.default.success(res, 200, logs, `All log file names`);
        });
    }
    catch (e) {
        return Clean_1.default.apiError('getAllLogFilenames', e, res);
    }
};
exports.newClientSideError = (req, res) => {
    try {
        Log_1.default.client('test', JSON.stringify(req.body.errdeets));
    }
    catch (e) {
        return Clean_1.default.apiError('getAllLogFilenames', e, res);
    }
};
//# sourceMappingURL=Admin.js.map