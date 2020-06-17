import React from "react";
import { useImmer } from "use-immer";
import Shell from "./Shell";
import { tokenize } from "../utils/parser";
import { programs } from "../constants/programs";
import { ShellState } from "../types/shell";
import { defaultLinks, consolePrefix } from "../constants/shell";

const ShellWrapper = () => {
  const [shellState, updateShellState] = useImmer<ShellState>({
    consoleHistory: [],
    inputValue: "",
    links: defaultLinks,
  });
  const runCommand = (command: string) => {
    const tokens = tokenize(command);
    const program = programs.find((program) => program.name === tokens[0]);
    // case 1: run program
    if (program) {
      program.run({
        shellState,
        updateShellState,
        args: tokens.slice(1),
        command,
      });
      return;
    }
    // case 2: go link
    const link = shellState.links.find((link) => link.name === tokens[0]);
    if (link) {
      window.location.href = `https://${link.url}`;
      return;
    }
    // case 3: command not found
    const errorMsg = `${tokens[0]}: command not found`;
    updateShellState((draft) => {
      draft.consoleHistory.push(consolePrefix.concat(command));
      draft.consoleHistory.push(errorMsg);
    });
  };
  return (
    <>
      <Shell
        shellState={shellState}
        updateShellState={updateShellState}
        runCommand={runCommand}
      />
    </>
  );
};

export default ShellWrapper;
