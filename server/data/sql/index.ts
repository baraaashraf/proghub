import { DataStore } from "..";
import { User, Post, Like, Comment } from "../../types";
import sqlite3 from "sqlite3";
import { open as sqliteOpen, Database } from "sqlite";
import path from "path";

export class SqlDataStore implements DataStore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  public async openDb() {
    // open the database
    this.db = await sqliteOpen({
      filename: path.join(__dirname, "proghub.sqlite"),
      driver: sqlite3.Database,
    });

    this.db.run("PRAGMA foreign_keys = ON");

    await this.db.migrate({
      migrationsPath: path.join(__dirname, "migrations"),
    });
    return this;
  }
  async createUser(user: User): Promise<void> {
    await this.db.run(
      'INSERT INTO users (id, email, password, firstName, lastName, userName) VALUES (?,?,?,?,?,?)',
      user.id,
      user.email,
      user.password,
      user.firstName,
      user.lastName,
      user.userName
    );
  }
  updateCurrentUser(user: Partial<User>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getUserById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getUserByEmail(email: string): Promise<User> {
    return this.db.get<User>(`Select * from users where email = ?`, email);
  }
  getUserByUsername(userName: string): Promise<User> {
    return this.db.get<User>(
      `Select * from users where username = ?`,
      userName
    );
  }
  listPosts(userId?: string): Promise<Post[]> {
    return this.db.all<Post[]>("SELECT * from posts");
  }
  async createPost(post: Post): Promise<void> {
    await this.db.run(
      "INSERT INTO posts (id, title, url, postedAt, userId) VALUES (?,?,?,?,?)",
      post.id,
      post.title,
      post.url,
      post.postedAt,
      post.userId
    );
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
