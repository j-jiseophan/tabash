import React, { useContext } from "react";
import classnames from "classnames";
import "../styles/Header.scss";
import githubLogo from "../assets/GitHub-Mark-32px.png";
import DarkModeButton from "./DarkModeButton";
import { ThemeContext } from "../contexts/theme";

const Header = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={classnames("app-header", { light: !isDarkMode })}>
      <div className="window-buttons">
        <span className="close"></span>
        <span className="minimize"></span>
        <span className="maximize"></span>
      </div>
      <span className="title">tabash</span>
      <div className="header-buttons">
        <DarkModeButton />
        <a href="https://github.com/j-jiseophan/tabash">
          <img src={githubLogo} alt="visit github" />
        </a>
      </div>
    </div>
  );
};

export default Header;
