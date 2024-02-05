import { Comment } from "../types";

export interface CommentDao {
  listComments(postId: string): Comment[];
  createComment(comment: Comment): void;
  deleteComment(id: string): void;
}
