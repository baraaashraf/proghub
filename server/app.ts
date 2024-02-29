import express, { RequestHandler, ErrorRequestHandler } from "express";
import https from "https";
import fs from "fs";
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
  app.use(express.json());

  app.use(requestLoggerMiddleware);

  app.get("/healthz", (req, res) => res.send({ status: "OK!!" }));

  app.post("/v1/signup", signUp);

  app.post("/v1/signin", signIn);

  app.use(authMiddleware);

  app.get("/v1/posts", listPosts);

  app.post("/v1/posts", createPost);

  app.use(errHandler);

  const env = process.env.ENV;
  const port = process.env.PORT

  const listener = () => {
    console.log(
      `Express is listening at http://localhost:${port} on ${env} enviroment`
    );
  };

  if (env === "prod") {
    const key = fs.readFileSync(
      "/home/proghub-user/certs/privkey.pem",
      "utf-8"
    );
    const cert = fs.readFileSync("/home/proghub-user/certs/cert.pem", "utf-8");
    https.createServer({ key, cert }, app).listen(port, listener);
  } else {
    app.listen(port, listener);
  }
})();
