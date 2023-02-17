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
            <img
              src="./TheFinalWhistle.png"
              alt="the final whistle logo"
              className="nav-logo"
            />
            <h3 className="project-title">The Final Whistle</h3>
          </Link>
          <ul className="nav-list">
            <li>
              <Link to="/football">Football</Link>
            </li>
            <li>
              <Link to="/cricket">Cricket</Link>
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
