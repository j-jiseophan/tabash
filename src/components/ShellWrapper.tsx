import React, { useState } from "react";
import Shell from "./Shell";

export interface ShellState {
  consoleHistory: string[];
}

const ShellWrapper = () => {
  const [consoleHistory, setConsoleHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const actions = {
    setConsoleHistory,
    setInputValue,
  };
  return (
    <>
      <Shell state={{ consoleHistory, inputValue }} actions={actions} />
    </>
  );
};

export default ShellWrapper;
