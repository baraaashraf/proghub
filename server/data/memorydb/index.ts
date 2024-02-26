import { DataStore } from "../";
import { Post, User, Comment, Like } from "../../types";

export class InMemoryDataStore implements DataStore {
  private users: User[] = [];
  private posts: Post[] = [];
  private comments: Comment[] = [];
  private likes: Like[] = [];

  createUser(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }

  getUserByEmail(email: string): Promise<User> | undefined {
    return Promise.resolve(this.users.find((u) => u.email === email));
  }
  getUserByUsername(username: string): Promise<User> {
    return Promise.resolve(this.users.find((u) => u.userName === username));
  }
  getUserById(id: string): Promise<User> | undefined {
    return Promise.resolve(this.users.find((u) => u.id === id));
  }
  updateCurrentUser(): Promise<void> {
    return Promise.resolve();
  }
  getPostByUrl(url: string): Promise<Post> {
    return Promise.resolve(this.posts.find((p) => p.url === url));
  }

  // getLikes(postId: string): Promise<number> {
  //   return Promise.resolve(this.likes.find((p) => p.postId === postId));
  // }
  countComments(): Promise<void> {
    return Promise.resolve();
  }

  listPosts(): Promise<Post[]> {
    return Promise.resolve(this.posts);
  }

  listComments(postId: string): Promise<Comment[]> {
    return Promise.resolve(this.comments.filter((c) => c.postId === postId));
  }

  createPost(post: Post): Promise<void> {
    this.posts.push(post);
    return Promise.resolve();
  }

  getPost(id: string): Promise<Post> | undefined {
    return Promise.resolve(this.posts.find((p) => p.id === id));
  }

  deletePost(id: string): Promise<void> {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) {
      return;
    }
    this.posts.splice(index, 1);
  }

  createLike(like: Like): Promise<void> {
    this.likes.push(like);
    return Promise.resolve();
  }

  createComment(comment: Comment): Promise<void> {
    this.comments.push(comment);
    return Promise.resolve();
  }

  deleteComment(id: string): Promise<void> {
    const index = this.comments.findIndex((c) => c.id === id);
    if (index === -1) {
      return;
    }
    this.comments.splice(index, 1);
  }
}
