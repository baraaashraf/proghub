import { ErrorRequestHandler } from "express";

export const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error("Uncaught Exception", err);
    res.status(500).send("Oops, an error occured, please try again");
  };