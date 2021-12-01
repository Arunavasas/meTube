import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchvalue } from "../actions/index";
function Navigation(props) {
  const theme = useRef();
  const inputvalue = useRef();
  const button = useRef();
  const [themeColor, setthemeColor] = useState("sun");

  const dispatch = useDispatch();
  useEffect(() => {
    const code = localStorage.getItem("theme");
    if (code === "sun") {
      theme.current.style.justifyContent = "flex-start";
      document.documentElement.style.setProperty("--text-color", "#252625");
      document.documentElement.style.setProperty("--back-color", "#fff");
      setthemeColor("sun");
    } else {
      localStorage.setItem("theme", "moon");
      theme.current.style.justifyContent = "flex-end";
      document.documentElement.style.setProperty("--text-color", "#fff");
      document.documentElement.style.setProperty("--back-color", "#252625");
      setthemeColor("moon");
    }
  }, []);

  function colorchange() {
    if (themeColor === "sun") {
      localStorage.setItem("theme", "moon");
      theme.current.style.justifyContent = "flex-end";
      document.documentElement.style.setProperty("--text-color", "#fff");
      document.documentElement.style.setProperty("--back-color", "#252625");
      setthemeColor("moon");
    } else {
      localStorage.setItem("theme", "sun");
      theme.current.style.justifyContent = "flex-start";

      document.documentElement.style.setProperty("--text-color", "#252625");
      document.documentElement.style.setProperty("--back-color", "#fff");
      setthemeColor("sun");
    }
  }

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <div className="logo">
            <img
              width="35px"
              height="35px"
              src={`${window.location.origin}/images/youtube.png`}
              alt=""
            />
            MeTube
          </div>
        </Link>
        <div className="searchbar-container">
          <div className="searchbar">
            <input
              onKeyPress={(e) => {
                if (e.code === "Enter") {
                  button.current.click();
                }
              }}
              type="text"
              placeholder="Search"
              ref={inputvalue}
            />
            <Link to="/">
              <button
                ref={button}
                onClick={() => {
                  if (inputvalue.current.value !== "")
                    dispatch(searchvalue(inputvalue.current.value));
                }}
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </Link>
          </div>
        </div>
        <div onClick={colorchange} className="theme" ref={theme}>
          <div className="circle">
            <i className={`fas fa-${themeColor}`}></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
