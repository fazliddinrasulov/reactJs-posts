import React from "react";
import { useInfoContext } from "../../context/InfoContext";
import Post from "../../components/Post";

const Home = () => {
  const { posts } = useInfoContext();
  const featuredPosts = [];
  // console.log(posts);
  if (posts) {
    const random = [];
    for (let i = 0; i < 9; i++) {
      random.push(Math.floor(Math.random() * posts.length));
      featuredPosts.push(posts.find((item, index) => index === random[i]));
    }
    console.log(featuredPosts);
  }
  return (
    <main>
      <h1 className="title">Featured Products</h1>
      <div className="posts">
        {featuredPosts.map((item, index) => {
          return <Post key={index} {...item} />;
        })}
      </div>
    </main>
  );
};

export default Home;
