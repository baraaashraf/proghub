import express, { RequestHandler } from "express";
import { db } from "./data";
import { createPost, listPosts } from "./handlers/postHandlers";
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

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
