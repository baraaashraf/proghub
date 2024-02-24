import express, { RequestHandler, ErrorRequestHandler } from "express";
import { initDB } from "./data";
import { createPost, listPosts } from "./handlers/postHandlers";
import { signUp, signIn } from "./handlers/authHandlers";
import { requestLoggerMiddleware } from "./middleware/loggerMiddleware";
import { errHandler } from "./middleware/errorMiddleware";
(async () => {
  await initDB();
  const app = express();
  const port = 3000;
  app.use(express.json());

  const posts = [];

  app.use(requestLoggerMiddleware);

  app.get("/v1/posts", listPosts);

  app.post("/v1/posts", createPost);

  app.post("/v1/signup", signUp);

  app.post("/v1/signin", signIn);

  app.use(errHandler);

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
})();
