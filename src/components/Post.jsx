import React, { useState } from "react";
import "./Post.css";
import defaultImg from "../assets/qwe.jpeg";
import { useNavigate } from "react-router-dom";

const Post = ({ _id, image, author }) => {
  const [showBtn, setShowBtn] = useState(false);
  const navigate = useNavigate();
  return (
    <article
      className="single-post"
      onMouseEnter={() => setShowBtn(true)}
      onMouseLeave={() => setShowBtn(false)}
      onClick={() => navigate(`/posts/${_id}`)}
    >
      <img
        src={_id === "632c5ab0d5c8093d9490d2dd" ? defaultImg : image.url}
        alt=""
        className="img"
      />
      <p className="post-author">{author[0].name}</p>
      <button className={showBtn ? "info-btn btn" : "none"}>Go Post</button>
    </article>
  );
};

export default Post;
