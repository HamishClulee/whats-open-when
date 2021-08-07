"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressStatusMonitor = require("express-status-monitor");
const Environment_1 = require("../providers/Environment");
class StatusMonitor {
    mount(_express) {
        const monitorOptions = {
            title: Environment_1.default.get().name,
            path: '/status-monitor',
            spans: [
                {
                    interval: 1,
                    retention: 60 // Keep 60 data-points in memory
                },
                {
                    interval: 5,
                    retention: 60
                },
                {
                    interval: 15,
                    retention: 60
                }
            ],
            chartVisibility: {
                mem: true,
                rps: true,
                cpu: true,
                load: true,
                statusCodes: true,
                responseTime: true
            }
        };
        // Loads the express status monitor middleware
        _express.use(expressStatusMonitor(monitorOptions));
        return _express;
    }
}
exports.default = new StatusMonitor;
//# sourceMappingURL=StatusMonitor.js.map