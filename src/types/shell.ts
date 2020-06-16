import React from "react";

export interface ShellState {
  consoleHistory: string[];
  inputValue: string;
  links: Link[];
}
export interface ShellActions {
  setConsoleHistory: React.Dispatch<string[]>;
  setInputValue: React.Dispatch<string>;
  runCommand: (command: string) => void;
  setLinks: React.Dispatch<Link[]>;
}

export interface ShellProps {
  state: ShellState;
  actions: ShellActions;
}

export interface ProgramProps {
  state: ShellState;
  actions: ShellActions;
  args: string[];
  command: string;
}

export interface Program {
  name: string;
  run: (props: ProgramProps) => void;
}

export interface Link {
  name: string;
  url: string;
}
