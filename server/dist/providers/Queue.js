"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kue = require("kue");
const Environment_1 = require("./Environment");
class Queue {
    constructor() {
        this.jobs = kue.createQueue({
            prefix: Environment_1.default.get().redisPrefix,
            redis: {
                port: Environment_1.default.get().redisHttpPort,
                host: Environment_1.default.get().redisHttpHost,
                db: Environment_1.default.get().redisDB
            }
        });
        this.jobs
            .on('job enqueue', (_id, _type) => { })
            .on('job complete', (_id) => this.removeProcessedJob(_id));
    }
    dispatch(_jobName, _args, _callback) {
        this.jobs.create(_jobName, _args).save();
        this.process(_jobName, 3, _callback);
    }
    removeProcessedJob(_id) {
        kue.Job.get(_id, (_err, _job) => {
            if (_err) {
                return;
            }
            _job.remove((_err) => {
                if (_err) {
                    throw _err;
                }
            });
        });
    }
    process(_jobName, _count, _callback) {
        this.jobs.process(_jobName, _count, (_job, _done) => {
            _done(); // Notifies KUE about the completion of the job!
            _callback(_job.data);
        });
    }
}
exports.default = new Queue;
//# sourceMappingURL=Queue.js.map