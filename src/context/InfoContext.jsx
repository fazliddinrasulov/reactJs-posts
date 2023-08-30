import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const InfoContext = createContext();

export const useInfoContext = () => useContext(InfoContext);

const InfoContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("profile")) || null
  );
  const baseUrl = "https://webstar-post-app.onrender.com/api/";
  const [token, setToken] = useState(localStorage.getItem("access_token") || null);
  const [posts, setPosts] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [myPost, setMyPost] = useState(null);

  const logout = () => {
    setCurrentUser(null);
    localStorage.clear();
    navigate("/");
  };
  const getPosts = async () => {
    try {
      const resp = await axios.get(`${baseUrl}post`);
      setPosts(resp.data);
    } catch (error) {
      console.log("error while fetching: ", error);
    }
  };
  const getMyPost = async () => {
    try {
      toast.loading("please wait...");
      const resp = await axios.get(`${baseUrl}my`, {
        headers: { access_token: localStorage.getItem("access_toke") },
      });
      setMyPost(resp.data);
      toast.dismiss();
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("something went wrong");
    }
  };
  const value = {
    currentUser,
    setCurrentUser,
    token,
    setToken,
    logout,
    posts,
    setPosts,
    baseUrl,
    isOpenModal,
    setIsOpenModal,
    getPosts,
    getMyPost,
    myPost,
  };
  useEffect(() => {
    getPosts();
    getMyPost();
  }, []);
  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
};

export default InfoContextProvider;
