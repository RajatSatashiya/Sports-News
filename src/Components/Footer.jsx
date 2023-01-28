import React from "react";
import "./Stylings/Footer.css";

function Footer() {
  return (
    <>
      <footer>
        <h2 className="project-title footer-title">Sports News</h2>
        <div className="footer-desc">
          <div className="crucial-links">
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li>F1 Racing</li>
                <li>Baseball</li>
                <li>Hockey</li>
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
                <li>Ahmedabad, Gujarat, India 132843</li>
                <li>random@gmail.com</li>
              </ul>
            </div>
          </div>

          <div className="bottom-desc">
            <div>
              Copyright © 2021-2022 Roommate Finder. All rights reserved
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
