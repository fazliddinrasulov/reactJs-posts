import React from "react";
import "./Post.css";

const Post = ({ urls, user }) => {
  return (
    <article className="single-post">
      <img src={urls?.regular} alt="" className="img" />
      <p className="post-author">{user?.name}</p>
    </article>
  );
};

export default Post;
