import React, { useContext } from "react";
import classnames from "classnames";
import "../styles/DarkModeButton.scss";
import { ThemeContext } from "../contexts/theme";
const DarkModeButton = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  return (
    <div
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={classnames("dark-mode-button", {
        light: !isDarkMode,
      })}
    ></div>
  );
};

export default DarkModeButton;
