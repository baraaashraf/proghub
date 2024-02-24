import { RequestHandler } from "express";

export const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, "=BODY:", req.body);
    next();
  };