import React, { useState } from "react";
import Shell from "./Shell";
import { tokenize } from "../utils/parser";
import { programs } from "../constants/programs";

export interface ShellState {
  consoleHistory: string[];
}

const ShellWrapper = () => {
  const [consoleHistory, setConsoleHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const runCommand = (command: string) => {
    const tokens = tokenize(command);
    const program = programs.find((program) => program.name === tokens[0]);
    if (program) {
      program.run({ state, actions, args: tokens.slice(1) });
    }
  };
  const state = {
    consoleHistory,
    inputValue,
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
