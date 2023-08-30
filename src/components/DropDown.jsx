import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import "./DropDown.css";
import { useInfoContext } from "../context/InfoContext";

const DropDown = () => {
  const { currentUser, logout } = useInfoContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="dropdown">
      <button className="btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {currentUser.name} <FaAngleDown />
      </button>
      <div className={isDropdownOpen ? "dropdown-content show1" : "dropdown-content"}>
        <p onClick={logout}>Logout</p>
      </div>
    </div>
  );
};

export default DropDown;
