import React, { useState } from "react";
import "./Post.css";
import { useNavigate } from "react-router-dom";

const Post = ({ urls, user }) => {
  const [showBtn, setShowBtn] = useState(false);
  const navigate = useNavigate();
  return (
    <article className="single-post">
      <img src={urls.regular} alt="" className="img" />
      <p className="post-author">{user.name}</p>
    </article>
  );
};

export default Post;
