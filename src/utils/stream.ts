import { UpdateShellState } from "../types/shell";

export const getWriteStdout = (updateShellState: UpdateShellState) => (
  msg: string
) =>
  updateShellState((draft) => {
    draft.stdout.push(msg);
  });

//TODO: make real stderr
export const getWriteStderr = (updateShellState: UpdateShellState) => (
  msg: string
) =>
  updateShellState((draft) => {
    draft.stdout.push(msg);
  });

export const getStream = (updateShellState: UpdateShellState) => ({
  writeStdout: getWriteStdout(updateShellState),
  writeStderr: getWriteStderr(updateShellState),
});
