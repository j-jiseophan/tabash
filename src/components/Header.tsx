import React from "react";
import "../styles/Header.scss";
import githubLogo from "../assets/GitHub-Mark-32px.png";
import DarkModeButton from "./DarkModeButton";
const Header = () => {
  return (
    <div className="app-header">
      <span className="title"> 🪐 tabash</span>
      <div className="header-buttons">
        <DarkModeButton />
        <a href="https://github.com/jshan2017/tabash">
          <img src={githubLogo} alt="visit github" />
        </a>
      </div>
    </div>
  );
};

export default Header;
