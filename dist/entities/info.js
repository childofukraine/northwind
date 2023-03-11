"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Info {
    constructor(query, timestamp, executionTime, workerId) {
        this.query = query;
        this.timestamp = timestamp;
        this.executionTime = executionTime;
        this.workerId = workerId;
    }
}
exports.default = Info;
