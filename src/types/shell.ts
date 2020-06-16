import React from "react";

export interface ShellState {
  consoleHistory: string[];
  inputValue: string;
}
export interface ShellActions {
  setConsoleHistory: React.Dispatch<string[]>;
  setInputValue: React.Dispatch<string>;
  runCommand: (command: string) => void;
}

export interface ShellProps {
  state: ShellState;
  actions: ShellActions;
}
