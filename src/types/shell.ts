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

export interface ProgramProps {
  state: ShellState;
  actions: ShellActions;
  args: string[];
}

export interface Program {
  name: string;
  run: (props: ProgramProps) => void;
}
