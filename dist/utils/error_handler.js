"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const boom_1 = require("@hapi/boom");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof boom_1.Boom) {
        return res.status(err.output.statusCode).json({ message: err.message });
    }
};
exports.errorHandler = errorHandler;
