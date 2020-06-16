import React, { useState } from "react";
import Shell from "./Shell";
import { tokenize } from "../utils/parser";
import { programs } from "../constants/programs";
import { Link, ShellActions, ShellState } from "../types/shell";
import { defaultLinks, consolePrefix } from "../constants/shell";

const ShellWrapper = () => {
  const [consoleHistory, setConsoleHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [links, setLinks] = useState<Link[]>(defaultLinks);
  const runCommand = (command: string) => {
    const tokens = tokenize(command);
    const program = programs.find((program) => program.name === tokens[0]);
    // case 1: run program
    if (program) {
      program.run({ state, actions, args: tokens.slice(1), command });
      return;
    }
    // case 2: go link
    const link = links.find((link) => link.name === tokens[0]);
    if (link) {
      window.location.href = `https://${link.url}`;
      return;
    }
    // case 3: command not found
    const errorMsg = `${tokens[0]}: command not found`;
    setConsoleHistory([
      ...consoleHistory,
      consolePrefix.concat(command),
      errorMsg,
    ]);
  };
  const state: ShellState = {
    consoleHistory,
    inputValue,
    links,
  };
  const actions: ShellActions = {
    setConsoleHistory,
    setInputValue,
    runCommand,
    setLinks,
  };
  return (
    <>
      <Shell state={state} actions={actions} />
    </>
  );
};

export default ShellWrapper;
