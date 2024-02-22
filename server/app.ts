import express, { RequestHandler, ErrorRequestHandler } from "express";
import { initDB } from "./data";
import { createPost, listPosts } from "./handlers/postHandlers";

(async () => {
  await initDB();
  const app = express();
  const port = 3000;
  app.use(express.json());

  const posts = [];

  const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, "=BODY:", req.body);
    next();
  };

  app.use(requestLoggerMiddleware);

  app.get("/posts", listPosts);

  app.post("/posts", createPost);

  const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error("Uncaught Exception", err);
    res.status(500).send("Oops, an error occured, please try again");
  };

  app.use(errHandler);

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
})();
