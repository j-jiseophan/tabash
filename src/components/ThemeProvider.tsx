import React, { useState, useEffect } from "react";
import { ThemeContext } from "../contexts/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode") === "false" ? false : true
  );
  useEffect(() => {
    localStorage.setItem("isDarkMode", `${isDarkMode}`);
  }, [isDarkMode]);
  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
