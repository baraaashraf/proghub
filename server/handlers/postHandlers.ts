import { RequestHandler } from "express";
import { db } from "../data";
import { Post } from "../types";
import crypto from "crypto";
import { ExpressHandler } from "../types";

export const listPosts: ExpressHandler<{}, {}> = (req, res) => {
  res.send({ posts: db.listPosts() });
};

type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;
interface CreatePostResponse {}
export const createPost: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = (req, res) => {
  if (!req.body.title || !req.body.url || !req.body.userId) {
    res.sendStatus(400);
  }
  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
  };
  db.createPost(post);
  res.sendStatus(200);
};
