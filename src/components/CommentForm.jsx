import axios from "axios";
import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useInfoContext } from "../context/InfoContext";

const CommentForm = ({ id, getSinglePost }) => {
  const [comment, setComment] = useState("");
  const { baseUrl } = useInfoContext();
  const addComment = async () => {
    try {
      const resp = await axios.post(
        `${baseUrl}comment`,
        { postId: id, content: comment },
        {
          headers: {
            access_token: localStorage.getItem("access_toke"),
          },
        }
      );
      getSinglePost();
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleComment = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addComment();
    setComment("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="add a comment"
        className="form-control"
        value={comment}
        onChange={handleComment}
        name="comment"
      />
      <button type="submit" className="btn">
        <AiOutlineSend />
      </button>
    </form>
  );
};

export default CommentForm;
