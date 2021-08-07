"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Log {
    constructor() {
        // Auth tags
        this.TAG_AUTH = 'AUTH';
        this.TAG_SIGNUP = 'SIGNUP';
        this.TAG_LOGIN = 'LOGIN';
        this.TAG_FAILED_CHALLENGE = 'FAILED_CHALLENGE';
        this.TAG_RESTARTED = 'RESTARTED';
        this.TAG_API_ERROR = 'API_ERROR';
        this.today = new Date();
        let _dateString = `${this.today.getFullYear()}-${this.ensureTwoDigits(this.today.getMonth(), true)}-${this.ensureTwoDigits(this.today.getDate())}`;
        let _timeString = `${this.ensureTwoDigits(this.today.getHours())}:${this.ensureTwoDigits(this.today.getMinutes())}:${this.ensureTwoDigits(this.today.getSeconds())}`;
        this.baseDir = path.join(__dirname, '../../.logs/');
        this.fileName = `${_dateString}.log`;
        this.linePrefix = `${_timeString}`;
    }
    ensureTwoDigits(term, offset = false) {
        term = offset ? (term + 1) : term;
        return ('0' + term).slice(-2);
    }
    client(category, _string, tags = []) {
        this.addLog('CLIENT', category, _string, tags);
    }
    // Adds INFO prefix string to the log string
    info(category, _string, tags = []) {
        this.addLog('INFO', category, _string, tags);
    }
    // Adds WARN prefix string to the log string
    warn(category, _string, tags = []) {
        this.addLog('WARN', category, _string, tags);
    }
    // Adds ERROR prefix string to the log string
    error(category, _string, tags = []) {
        // Line break and show the first line
        // console.log('\x1b[31m%s\x1b[0m', '[ERROR] :: ' + _string.split(/r?\n/)[0])
        this.addLog('ERROR', category, _string, tags);
    }
    /**
     * Creates the file if does not exist, and
     * append the log kind & string into the file.
     */
    addLog(_level, _category, _string, tags = []) {
        const _that = this;
        _level = _level.toUpperCase();
        const addTags = () => {
            let result = '';
            if (tags) {
                tags.forEach(tag => {
                    result += `{~{ ${tag} }~} `;
                });
            }
            return result;
        };
        fs.open(`${_that.baseDir}${_that.fileName}`, 'a', (_err, _fileDescriptor) => {
            if (!_err && _fileDescriptor) {
                // in dev only, used for debugging
                // if (process.env.NODE_ENV === 'development') { console.log(`[[${_that.linePrefix}]] [[${_level}]] [[${_category}]] [[${_string}]] [[${addTags()}]] \n\n`) }
                // Append to file and close it
                fs.appendFile(_fileDescriptor, `${_that.linePrefix}~~${_level}~~${_category}~~${addTags()}~~${_string} \n`, (_err) => {
                    if (!_err) {
                        fs.close(_fileDescriptor, (_err) => {
                            if (!_err) {
                                return true;
                            }
                            else {
                                return console.log('\x1b[31m%s\x1b[0m', 'Error closing log file that was being appended');
                            }
                        });
                    }
                    else {
                        return console.log('\x1b[31m%s\x1b[0m', 'Error appending to the log file');
                    }
                });
            }
            else {
                return console.log('\x1b[31m%s\x1b[0m', 'Error couldn\'t open the log file for appending');
            }
        });
    }
}
exports.default = new Log;
//# sourceMappingURL=Log.js.map