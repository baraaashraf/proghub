import { response } from "express";
import { useEffect, useState } from "react";
import { Post } from "../../shared";
export const App = () => {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/posts")
      .then((res) => res.json())
      .then((response) => setPosts(response.posts));
  });
  return (posts?.length || 0) > 0 ? (
    <div>JSON.stringfy(posts)</div>
  ) : (
    <div>No Posts</div>
  );
};
