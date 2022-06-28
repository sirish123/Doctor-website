import React from "react";
import "./Footer.css";
const Footer = () => (
  <div>
    <div className="footer p-3">
      <div className="text-center">
        <div>
          <h4>Nature Wellness Center</h4>
          <div className="fs-5">
            <a href="/#" className="p-2">
              <i className="bi bi-linkedin"></i>
            </a>
            {"  "}
            <a href="/#" className="p-2">
              <i className="bi bi-facebook"></i>
            </a>
            {"  "}
            <a href="/#" className="p-2">
              <i className="bi bi-whatsapp text-success"></i>
            </a>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
