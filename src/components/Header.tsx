import React from "react";
import "../styles/Header.scss";
import githubLogo from "../assets/GitHub-Mark-32px.png";
const Header = () => {
  return (
    <div className="app-header">
      tabash
      <a href="https://github.com/jshan2017/tabash">
        <img src={githubLogo} alt="visit github" />
      </a>
    </div>
  );
};

export default Header;
