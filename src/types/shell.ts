export interface ShellState {
  stdout: string[];
  stdin: Stdin;
  links: Link[];
}

export interface Stdin {
  history: string[];
  currentValue: string;
  historyBackIndex: number;
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
