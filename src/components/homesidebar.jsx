import React from "react";
import { Link } from "react-router-dom";

function Homesidebar(props) {
  return (
    <>
      <div className="sidebar">
        <div className="cont">
          <Link to="/">
            <i className="fas fa-home"></i>
            <div>Home</div>
          </Link>
          <Link to="/">
            <i className="fab fa-internet-explorer"></i>
            <div>Explore</div>
          </Link>
          <Link to="/">
            <i className="fab fa-youtube"></i>
            <div>Subscription</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Homesidebar;
