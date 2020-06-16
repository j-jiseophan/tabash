import React, { useState } from "react";
import Shell from "./Shell";
import { tokenize } from "../utils/parser";

export interface ShellState {
  consoleHistory: string[];
}

const ShellWrapper = () => {
  const [consoleHistory, setConsoleHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const runCommand = (command: string) => {
    const tokens = tokenize(command);
    console.log(tokens);
  };
  const actions = {
    setConsoleHistory,
    setInputValue,
    runCommand,
  };
  return (
    <>
      <Shell state={{ consoleHistory, inputValue }} actions={actions} />
    </>
  );
};

export default ShellWrapper;
