"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = require("../middlewares/Log");
class NativeEvent {
    cluster(_cluster) {
        // Catch cluster listening event...
        _cluster.on('listening', () => {
            // Cluster listenting
        });
        // Catch cluster once it is back online event...
        _cluster.on('online', () => {
            // Cluster online
        });
        // Catch cluster disconnect event...
        _cluster.on('disconnect', () => {
            // Cluster disconnected
        });
        // Catch cluster exit event...
        _cluster.on('exit', (worker, code, signal) => {
            Log_1.default.warn(`NativeEventExit`, `Cluster with ProcessID '${worker.process.pid}' is Dead with Code: ${code}, and signal: ${signal}`);
            // Ensuring a new cluster will start if an old one dies
            _cluster.fork();
        });
    }
    process() {
        // Catch the Process's uncaught-exception
        process.on('uncaughtException', (exception) => Log_1.default.error(`NativeEventUncaughtExcpt`, exception.stack));
        // Catch the Process's warning event
        process.on('warning', (warning) => Log_1.default.warn(`NativeEventWarning`, warning.stack));
    }
}
exports.default = new NativeEvent;
//# sourceMappingURL=NativeEvent.js.map