import { createContext } from "react";
import { ThemecontextValue } from "../types/context";

export const ThemeContext = createContext<ThemecontextValue>({
  isDarkMode: true,
  setIsDarkMode: () => undefined,
});
