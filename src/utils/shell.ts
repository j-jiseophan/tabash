import { UpdateShellState } from "../types/shell";

export const toStdout = (msg: string, updateShellState: UpdateShellState) => {
  updateShellState((draft) => {
    draft.stdout.push(msg);
  });
};

//TODO: make real stderr
export const toStderr = (msg: string, updateShellState: UpdateShellState) => {
  updateShellState((draft) => {
    draft.stdout.push(msg);
  });
};
