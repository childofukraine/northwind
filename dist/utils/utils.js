"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQueryTime = exports.getTS = void 0;
const moment_1 = __importDefault(require("moment"));
const getTS = () => {
    return `${(0, moment_1.default)().format("L").replaceAll("/", ".")} ${(0, moment_1.default)()
        .format()
        .slice(11, 19)}`;
};
exports.getTS = getTS;
const executeQueryTime = (startTime, endTime) => {
    return `${endTime - startTime}ms`;
};
exports.executeQueryTime = executeQueryTime;
