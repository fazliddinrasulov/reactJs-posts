import { useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { links } from "../data";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import DropDown from "./DropDown";
import { useInfoContext } from "../context/InfoContext";

const Navbar = () => {
  const { logout } = useInfoContext();
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef();
  const linksRef = useRef();

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-icon">
          <h1>POSTS APP</h1>
          <button className="nav-toggle" onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div
          style={{
            height: showLinks
              ? `${linksRef?.current?.getBoundingClientRect().height}px`
              : "0px",
          }}
          className="links-container"
          ref={linksContainerRef}
        >
          <ul className="links" ref={linksRef}>
            {links.map((link) => {
              return (
                <li key={link.id}>
                  <NavLink to={link.url}>{link.text}</NavLink>
                </li>
              );
            })}

            <li className="show" onClick={logout}>
              <NavLink>logout</NavLink>
            </li>
          </ul>
        </div>
        <DropDown />
      </div>
    </nav>
  );
};

export default Navbar;
