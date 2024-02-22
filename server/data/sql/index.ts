import { DataStore } from "..";
import { User, Post, Like, Comment } from "../../types";
import sqlite3 from "sqlite3";
import { open as sqliteOpen } from "sqlite";
import path from "path";

export class SqlDataStore implements DataStore {
  public async openDb() {
    // open the database
    const db = await sqliteOpen({
      filename: path.join(__dirname, "proghub.sqlite"),
      driver: sqlite3.Database,
    });

    await db.migrate({
      migrationsPath: path.join(__dirname, "migrations"),
    });
    return this;
  }
  createUser(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateCurrentUser(user: Partial<User>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getUserById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getUserByEmail(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getUserByUsername(userName: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  listPosts(userId?: string): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
  createPost(post: Post): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getPost(id: string, userId?: string): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  getPostByUrl(url: string): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  deletePost(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createLike(like: Like): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createComment(comment: Comment): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listComments(postId: string): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
  deleteComment(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
