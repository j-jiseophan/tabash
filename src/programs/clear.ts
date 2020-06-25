import { Program, ProgramProps } from "../types/shell";

const runClear = ({ shellState, updateShellState }: ProgramProps) => {
  updateShellState((draft) => {
    draft.stdout = [];
  });
  return;
};

const clear: Program = { name: "clear", run: runClear };

export default clear;
