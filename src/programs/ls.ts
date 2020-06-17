import { Program, ProgramProps } from "../types/shell";

const runLs = ({ shellState, updateShellState, args }: ProgramProps) => {
  const outputMsg = shellState.links
    .map((link) => link.name.trim())
    .join("\u00A0\u00A0\u00A0\u00A0");
  updateShellState((draft) => {
    draft.stdout.push(outputMsg);
  });
  return;
};

const ls: Program = { name: "ls", run: runLs };

export default ls;
