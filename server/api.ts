import { Post } from "./types";
import { User } from "./types";
import { Comment } from "./types";
import { Like } from "./types";

//Post APIs
export interface ListPostsRequest {}
export interface ListPostsResponse {
  posts: Post[];
}
export type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;
export interface CreatePostResponse {}

export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post;
}

//Comment APIs

//Like APIs

//User APIs

export type SignUpRequest = Pick<
  User,
  "email" | "firstName" | "lastName" | "userName" | "password"
>;
export interface SignUpResponse {}

export interface SignInRequest {
  login: string; //username or email
  password: string;
}
export type SignInResponse = Pick<
  User,
  "email" | "firstName" | "lastName" | "userName" | "id"
>;
