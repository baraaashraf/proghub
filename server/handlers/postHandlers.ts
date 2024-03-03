import { RequestHandler } from "express";
import { db } from "../data";
import { Post } from "../../shared/src/types";
import crypto from "crypto";
import { ExpressHandler } from "../../shared/src/types";
import {
  CreatePostRequest,
  CreatePostResponse,
  ListPostsRequest,
  ListPostsResponse,
} from "../../shared/src/api";

export const listPosts: ExpressHandler<
  ListPostsRequest,
  ListPostsResponse
> = async (req, res) => {
  res.send({ posts: await db.listPosts() });
};

export const createPost: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = async (req, res) => {
  if (!req.body.title || !req.body.url) {
    res.sendStatus(400);
  }
  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: res.locals.userId
  };
  await db.createPost(post);
  res.sendStatus(200);
};
