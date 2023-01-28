import React from "react";
import { useRef, useState, useContext, useEffect } from "react";
import "./Stylings/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [height, setHeight] = useState();
  const [sideshow, setSideshow] = useState(false);
  const [name, setName] = useState("RoomZap");
  const navbar = useRef();

  useEffect(() => {
    setHeight(navbar.current.offsetHeight);
  }, []);
  return (
    <>
      <nav ref={navbar} className="nav2">
        <div className="nav-portion">
          <Link to="/">
            <h3 className="project-title">Sports News</h3>
          </Link>
          <ul className="nav-list">
            <li>Football</li>
            <li>Cricket</li>
            <li
              className="profile-icon"
              onClick={() => {
                setSideshow(!sideshow);
              }}
            >
              {name[0].toUpperCase()}
            </li>
          </ul>
        </div>

        {sideshow && (
          <div className="sidebar-container">
            <ul className="profile-hover">
              <li>Profile</li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
