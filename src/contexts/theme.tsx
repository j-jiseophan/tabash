import React, { useState, useEffect, createContext } from "react";
import { ThemecontextValue } from "../types/context";

export const ThemeContext = createContext<ThemecontextValue>({
  isDarkMode: true,
  setIsDarkMode: () => undefined,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
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
