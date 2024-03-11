import { response } from "express";
import { ListPostsRequest, ListPostsResponse } from "@proghub/shared";

export const HOST =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://proghub.site";

export const listPosts = async (
  req: ListPostsRequest
): Promise<ListPostsResponse> => {
  const response = fetch(`http://localhost:3000/api/v1/posts`);
  if (!(await response).ok) {
    const error = (await response).json();
    throw error;
  }
  return (await response).json();
};
