import { Program, ProgramProps } from "../types/shell";
import { toStdout } from "../utils/shell";
import { TAB } from "../constants/shell";
const runLs = ({ shellState, updateShellState }: ProgramProps) => {
  const outputMsg = shellState.links.map((link) => link.name.trim()).join(TAB);
  toStdout(outputMsg, updateShellState);
  return;
};

const ls: Program = { name: "ls", run: runLs };

export default ls;
