export interface ShellState {
  consoleHistory: string[];
  inputValue: string;
  links: Link[];
}

export interface ShellProps {
  shellState: ShellState;
  updateShellState: UpdateShellState;
  runCommand: (command: string) => void;
}

export interface ProgramProps {
  shellState: ShellState;
  updateShellState: UpdateShellState;
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

export type UpdateShellState = (
  f: (draft: ShellState) => void | ShellState
) => void;
