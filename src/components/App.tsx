import React from "react";
import "../styles/App.scss";
import Header from "./Header";
import ShellWrapper from "./ShellWrapper";
import { ThemeProvider } from "../contexts/theme";

function App() {
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
