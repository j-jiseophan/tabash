import { useContext } from "react";
import classnames from "classnames";
import "../styles/App.scss";
import Header from "./Header";
import ShellWrapper from "./ShellWrapper";
import { ThemeProvider, ThemeContext } from "../contexts/theme";

function AppContent() {
  const { isDarkMode, customWallpaper } = useContext(ThemeContext);

  return (
    <div
      className={classnames("App", {
        light: !isDarkMode,
        "custom-wallpaper": !!customWallpaper,
      })}
      style={
        customWallpaper
          ? { "--custom-wallpaper": `url(${customWallpaper})` } as React.CSSProperties
          : undefined
      }
    >
      <Header />
      <ShellWrapper />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
