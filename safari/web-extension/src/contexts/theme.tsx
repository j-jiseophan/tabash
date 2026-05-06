import { useState, useEffect, createContext } from "react";
import { ThemecontextValue } from "../types/context";

export const ThemeContext = createContext<ThemecontextValue>({
  isDarkMode: true,
  setIsDarkMode: () => undefined,
  customWallpaper: null,
  setCustomWallpaper: () => undefined,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode") === "false" ? false : true
  );
  const [customWallpaper, setCustomWallpaper] = useState<string | null>(
    localStorage.getItem("customWallpaper")
  );

  useEffect(() => {
    localStorage.setItem("isDarkMode", `${isDarkMode}`);
  }, [isDarkMode]);

  useEffect(() => {
    if (customWallpaper) {
      localStorage.setItem("customWallpaper", customWallpaper);
    } else {
      localStorage.removeItem("customWallpaper");
    }
  }, [customWallpaper]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        customWallpaper,
        setCustomWallpaper,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
