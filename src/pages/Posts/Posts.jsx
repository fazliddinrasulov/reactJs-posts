import React, { useEffect } from "react";
import { useInfoContext } from "../../context/InfoContext";
import Post from "../../components/Post";

const Posts = () => {
  const { posts, getPosts } = useInfoContext();
  getPosts();
  useEffect(() => {}, []);
  return (
    <main>
      <div className="posts">
        {posts?.map((post, index) => {
          return <Post key={index} {...post} />;
        })}
      </div>
    </main>
  );
};

export default Posts;
