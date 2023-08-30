import axios from "axios";
import React, { useState } from "react";
import { useInfoContext } from "../../context/InfoContext";
import { toast } from "react-toastify";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const { baseUrl, setCurrentUser, setToken } = useInfoContext();
  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const signupUser = async () => {
    try {
      toast.loading("please wait...");
      const resp = await axios.post(`${baseUrl}signup`, data);
      toast.dismiss();
      toast.success(resp.data.message);
      localStorage.setItem("profile", JSON.stringify(resp.data.user));
      localStorage.setItem("access_toke", resp.data.token);
      setToken(resp.data.token);
      setCurrentUser(resp.data.user);
      setData({
        name: "",
        surname: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(resp.data.message);
    }
  };
  const loginUser = async () => {
    try {
      toast.loading("please wait...");
      const resp = await axios.post(`${baseUrl}login`, {
        email: data.email,
        password: data.password,
      });
      toast.dismiss();
      toast.success(resp.data.message);
      localStorage.setItem("profile", JSON.stringify(resp.data.user));
      localStorage.setItem("access_toke", resp.data.token);
      setCurrentUser(resp.data.user);
      setData({
        name: "",
        surname: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(resp.message);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    if (isSignup) {
      loginUser();
    } else {
      signupUser();
    }
    e.preventDefault();
  };
  return (
    <div className="p-5 auth-container mt-5">
      <form action="#" className="form-control mt-5" onSubmit={handleSubmit}>
        <h2 className="text-center text-info mb-5">{isSignup ? "Login" : "Signup"}</h2>
        {!isSignup && (
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="form-control mb-3"
            required
            placeholder="Enter Your Name"
            autoComplete="on"
          />
        )}
        {!isSignup && (
          <input
            type="text"
            name="surname"
            value={data.surname}
            onChange={handleChange}
            className="form-control mb-3"
            required
            placeholder="Enter Your Surname"
            autoComplete="on"
          />
        )}
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="form-control mb-3"
          required
          placeholder="Enter Your Email"
          autoComplete="on"
        />
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className="form-control mb-3"
          required
          placeholder="Enter Your Password"
          autoComplete="on"
        />
        <button type="submit" className="btn  btn-block">
          {isSignup ? "Login" : "Signup"}
        </button>
        <div className="d-flex justify-content-end p-2 ">
          <span
            className="text-secondary "
            role="button"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Go to register an account" : "I have an account"}
          </span>
        </div>
      </form>
    </div>
  );
};

export default Auth;
