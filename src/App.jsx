import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import { useInfoContext } from "./context/InfoContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Posts from "./pages/Posts/Posts";
import Error from "./pages/Error/Error";
import Navbar from "./components/Navbar";
import SinglePost from "./pages/SinglePost/SinglePost";
import MyPosts from "./pages/MyPosts/MyPosts";
import Footer from "./components/Footer";
import Unsplash from "./pages/Unsplash/Unsplash";

function App() {
  const { currentUser } = useInfoContext();

  return (
    <>
      {currentUser && <Navbar />}
      <Routes>
        <Route path="/" element={currentUser ? <Home /> : <Auth />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/unsplash" element={<Unsplash />} />

        <Route path="/*" element={<Error />} />
      </Routes>
      {currentUser && <Footer />}
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
