"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQueryTime = exports.getTS = void 0;
const getTS = () => {
    return new Date().toISOString().slice(0, 19).replace("T", " ");
};
exports.getTS = getTS;
const executeQueryTime = (startTime, endTime) => {
    return `${endTime - startTime}ms`;
};
exports.executeQueryTime = executeQueryTime;
