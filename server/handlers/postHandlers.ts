import { RequestHandler } from "express";
import { db } from "../data";
import { Post } from "../types";
import crypto from "crypto";
import { ExpressHandler } from "../types";
import {
  CreatePostRequest,
  CreatePostResponse,
  ListPostsRequest,
  ListPostsResponse,
} from "../api";

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
  await db.createPost(post);
  res.sendStatus(200);
};
