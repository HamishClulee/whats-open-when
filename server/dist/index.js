"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const cluster = require("cluster");
const App_1 = require("./providers/App");
const NativeEvent_1 = require("./exception/NativeEvent");
if (cluster.isMaster) {
    /**
     * Catches the process events
     */
    NativeEvent_1.default.process();
    /**
     * Load Configuration
     */
    App_1.default.loadConfiguration();
    /**
     * Find the number of available CPUS
     */
    const CPUS = os.cpus();
    /**
     * Fork the process, the number of times we have CPUs available
     */
    CPUS.forEach(() => cluster.fork());
    /**
     * Catches the cluster events
     */
    NativeEvent_1.default.cluster(cluster);
    /**
     * Loads the Queue Monitor if enabled
     */
    App_1.default.loadQueue();
}
else {
    /**
     * Run the Database pool
     */
    App_1.default.loadDatabase();
    /**
     * Run the Server on Clusters
     */
    App_1.default.loadServer();
}
//# sourceMappingURL=index.js.map