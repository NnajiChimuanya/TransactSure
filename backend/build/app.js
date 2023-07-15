"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("./server"));
if (cluster_1.default.isMaster) {
    const cpus = os_1.default.cpus().length;
    console.log(`Forking for ${cpus}`);
    for (let i = 0; i < cpus; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(` worker ${worker.process.pid} died`);
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`worker ${worker.id} crashed`);
            console.log(`Starting new worker`);
            cluster_1.default.fork();
        }
    });
}
else {
    const port = process.env.PORT || 3001;
    mongoose_1.default
        .connect(process.env.mongo_uri)
        .then(() => console.log("connected to the database"))
        .catch((err) => console.log(err));
    server_1.default.listen(port, () => { var _a; return console.log(`${(_a = cluster_1.default.worker) === null || _a === void 0 ? void 0 : _a.id} Hello, server running`); });
}
