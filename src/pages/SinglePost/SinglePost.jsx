import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInfoContext } from "../../context/InfoContext";
import "./SinglePost.css";
import defaultImg from "../../assets/qwe.jpeg";
import { FaRegUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { AiFillLike, AiFillDislike, AiFillEdit, AiFillDelete } from "react-icons/ai";
import axios from "axios";
import Modal from "../../components/Modal";
import CommentForm from "../../components/CommentForm";
import { toast } from "react-toastify";

const SinglePost = () => {
  const { id } = useParams();
  const { baseUrl, currentUser, setIsOpenModal, getPosts, getMyPost } = useInfoContext();
  const [singlePost, setSinglePost] = useState(null);
  const [isPostDeleted, setIsPostDeleted] = useState(false);
  const handleLike = async () => {
    try {
      const resp = await axios.get(`${baseUrl}like/${id}`, {
        headers: { access_token: localStorage.getItem("access_toke") },
      });
      getSinglePost();
    } catch (error) {
      console.log("error has occured");
    }
  };
  const handleDislike = async () => {
    try {
      const resp = await axios.get(`${baseUrl}dislike/${id}`, {
        headers: { access_token: localStorage.getItem("access_toke") },
      });
      getSinglePost();
    } catch (error) {
      console.log("error has occured");
    }
  };
  const handleDeletePost = async () => {
    toast.loading("please wait ...");
    try {
      const resp = await axios.delete(`${baseUrl}post/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_toke"),
        },
      });
      setIsPostDeleted(true);
      getPosts();
      getMyPost();
      toast.dismiss();
      toast.success("post is deleted");
    } catch (error) {
      toast.dismiss();
      toast.error("something is wrong 🫤");
    }
  };
  const handleEdit = async () => {
    // try {
    //   const resp = await axios.put(`${baseUrl}comment/${id}`, {content:});
    // } catch (error) {}
  };
  const handleDeleteComment = async (id) => {
    try {
      const resp = await axios.delete(`${baseUrl}comment/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_toke"),
        },
      });
      getSinglePost();
    } catch (error) {}
  };

  const getSinglePost = async () => {
    try {
      const resp = await axios.get(`${baseUrl}post/${id}`);
      setSinglePost(resp.data[0]);
    } catch (error) {}
  };
  useEffect(() => {
    getSinglePost();
  }, []);
  if (isPostDeleted) {
    return <h1 className="title">Post was deleted</h1>;
  }
  return (
    <main className="single-post-container container">
      <Modal>
        <h3>Likes: {singlePost?.like.length}</h3>
        {singlePost?.like.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </Modal>
      <div className="image-container">
        <span className="views">{singlePost?.views} views</span>
        {singlePost?.authorId === currentUser._id && (
          <span className="delete btn" onClick={handleDeletePost}>
            delete post
          </span>
        )}

        {id === "632c5ab0d5c8093d9490d2dd" ? (
          <img src={defaultImg} className="img" />
        ) : (
          <img src={singlePost?.image.url} alt="" className="img" />
        )}
      </div>
      <div className="content">
        <h3 className="title">
          {<FaRegUser />} - {singlePost?.author[0].name}
        </h3>
        <p className="text-small">{singlePost?.content}</p>
        <hr />
        <div className="comments">
          {singlePost?.comments.map((item, index) => {
            return (
              <div key={index} className="comment">
                <span className="avatar">
                  <FiUser />
                </span>
                <p>
                  <strong className="user-comment">{item.author[0].name}</strong>
                  {": "}
                  <span>{item.content}</span>
                </p>
                {item?.author[0]._id === currentUser?._id && (
                  <div className="edit-del-btn">
                    <span onClick={handleEdit}>
                      <AiFillEdit />
                    </span>
                    <span className="del" onClick={() => handleDeleteComment(item._id)}>
                      <AiFillDelete />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <CommentForm id={id} getSinglePost={getSinglePost} />
        <div className="post-infos">
          <span onClick={handleLike}>
            <AiFillLike
              className={singlePost?.like.includes(currentUser._id) && "fill-red"}
            />
            {singlePost?.like.length}
          </span>
          <span onClick={handleDislike}>
            <AiFillDislike
              className={singlePost?.dislike.includes(currentUser._id) && "fill-red"}
            />
            {singlePost?.dislike.length}
          </span>
          <span onClick={() => setIsOpenModal(true)}>liked by ...</span>
        </div>
      </div>
    </main>
  );
};

export default SinglePost;
