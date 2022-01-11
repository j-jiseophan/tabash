import React from "react";
import "../styles/App.scss";
import Header from "./Header";
import ShellWrapper from "./ShellWrapper";
import { ThemeProvider } from "../contexts/theme";
import { parseQueryString } from "../utils/utils";

function App() {
  const queryParams = parseQueryString();
  const focused = queryParams["focus"];
  if (!focused) {
    chrome.tabs.create({
      url: chrome.extension.getURL("/index.html?focus=true"),
    });
    window.close();
    return null;
  }
  
  return (
    <div className="App">
      <ThemeProvider>
        <Header />
        <ShellWrapper />
      </ThemeProvider>
    </div>
  );
}

export default App;
