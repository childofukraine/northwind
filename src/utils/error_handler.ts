import { Boom } from "@hapi/boom";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof Boom) {
    return res.status(err.output.statusCode).json({ message: err.message });
  }
};
