import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";

const baseUrl = "https://api.unsplash.com/";
const access_key = "jIRQOyAjuOjVo_kqu-2uIyYAOnuYDRMBRWdsSLcEpiI";

const Unsplash = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const getImages = async () => {
    try {
      const resp = await axios.get(
        `${baseUrl}photos/?client_id=${access_key}&page=${page}&per_page=12`
      );
      setImages((prev) => [...images, ...resp.data]);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong: ", error);
    }
  };
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1
    ) {
      setLoading(true);
    }
  };

  useEffect(() => {
    getImages();
  }, [loading]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <main>
      <div className="posts">
        {images.map((item, index) => {
          return <Post key={index} {...item} />;
        })}
      </div>
    </main>
  );
};

export default Unsplash;
