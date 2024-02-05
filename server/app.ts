import express, { RequestHandler } from "express";
import { db } from "./data";
const app = express();
const port = 3000;
app.use(express.json());

const posts = [];

const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, "=BODY:", req.body);
  next();
};

app.use(requestLoggerMiddleware);

app.get("/posts", (req, res) => {
  res.send({ posts:db.listPosts });
});

app.post("/posts", (req, res) => {
  const post = req.body;
  db.createPost(post)
  res.sendStatus(200)
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
