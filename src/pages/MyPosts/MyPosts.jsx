import React, { useEffect } from "react";
import "./MyPosts.css";
import Modal from "../../components/Modal";
import { useInfoContext } from "../../context/InfoContext";
import axios from "axios";
import { toast } from "react-toastify";
import Post from "../../components/Post";

const MyPosts = () => {
  const { setIsOpenModal, baseUrl, myPost, setRender, render } = useInfoContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("please wait...");
    try {
      const resp = await axios.post(`${baseUrl}post`, new FormData(e.target), {
        headers: {
          access_token: localStorage.getItem("access_toke"),
        },
      });
      toast.dismiss();
      toast.success(resp.data);
      setIsOpenModal(false);
      setRender(!render);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("post qo'shilmadi qaytadan urinib ko'ring");
      setIsOpenModal(false);
    }
  };
  useEffect(() => {
    setRender(!render);
  }, []);
  return (
    <div className="container ">
      <Modal>
        <form className="modal-form " onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="form-control"
              placeholder="add title"
            />
          </div>
          <div>
            <input
              type="file"
              id="image"
              name="image"
              required
              className="form-control"
            />
          </div>
          <div>
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="5"
              required
              className="form-control"
              placeholder="add content"
            />
          </div>
          <button type="submit" className="btn ">
            submit
          </button>
        </form>
      </Modal>
      <main className="container ">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2
            onClick={() => setIsOpenModal(true)}
            className=" btn"
            style={{ background: "white", color: "var(--primary-700)" }}
          >
            create a post +
          </h2>
        </div>
        <div className="posts">
          {myPost?.map((item, index) => {
            return <Post key={index} {...item} />;
          })}
        </div>
      </main>
    </div>
  );
};

export default MyPosts;
