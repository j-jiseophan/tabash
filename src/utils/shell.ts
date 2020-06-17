import { UpdateShellState } from "../types/shell";

export const stdout = (msg: string, updateShellState: UpdateShellState) => {
  updateShellState((draft) => {
    draft.stdout.push(msg);
  });
};

//TODO: make real stderr
export const stderr = (msg: string, updateShellState: UpdateShellState) => {
  updateShellState((draft) => {
    draft.stdout.push(msg);
  });
};
