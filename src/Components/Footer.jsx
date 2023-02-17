import React from "react";
import { Link } from "react-router-dom";
import "./Stylings/Footer.css";

function Footer() {
  return (
    <>
      <footer>
        <h2 className="project-title footer-title">The Final Whistle</h2>
        <div className="footer-desc">
          <div className="crucial-links">
            <div>
              <h4>Quick Links</h4>
              <ul>
                <Link to="/f1">
                  <li>F1 Racing</li>
                </Link>
                <li>Cricket</li>
                <li>Football</li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li>Terms and Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4>About</h4>
              <ul>
                <li>Company</li>
                <li>Careers</li>
                <li>Refund Policy</li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>Ahmedabad, Gujarat</li>
                <li>kshri4398@gmail.com</li>
              </ul>
            </div>
          </div>

          <div className="bottom-desc">
            <div>
              Copyright © 2022-2023 The Final Whistle. All rights reserved
            </div>
            <div className="social-icons">
              <i className="fab fa-instagram"></i>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-linkedin"></i>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
