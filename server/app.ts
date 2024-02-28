import express, { RequestHandler, ErrorRequestHandler } from "express";
import { initDB } from "./data";
import { createPost, listPosts } from "./handlers/postHandlers";
import { signUp, signIn } from "./handlers/authHandlers";
import { requestLoggerMiddleware } from "./middleware/loggerMiddleware";
import { errHandler } from "./middleware/errorMiddleware";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/authMiddleware";
(async () => {
  await initDB();
  dotenv.config();
  const app = express();
  const port = 3000;
  app.use(express.json());

  app.use(requestLoggerMiddleware);

  app.get("/healthz", (req, res) => res.send({ status: "OK!!" }));

  app.post("/v1/signup", signUp);

  app.post("/v1/signin", signIn);

  app.use(authMiddleware);

  app.get("/v1/posts", listPosts);

  app.post("/v1/posts", createPost);

  app.use(errHandler);

  app.listen(process.env.PORT || port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
})();
