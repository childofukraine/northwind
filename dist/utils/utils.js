"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcExecutionTime = exports.getTS = exports.workerId = void 0;
const uuid_1 = require("uuid");
exports.workerId = `primary-${(0, uuid_1.v4)()}.render.db`;
const getTS = () => {
    return new Date().toISOString();
};
exports.getTS = getTS;
const calcExecutionTime = (start, end) => end - start;
exports.calcExecutionTime = calcExecutionTime;
