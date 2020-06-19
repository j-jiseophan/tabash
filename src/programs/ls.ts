import { Program, ProgramProps } from "../types/shell";
import { getStream } from "../utils/stream";
import { TAB } from "../constants/shell";
const runLs = ({ shellState, updateShellState }: ProgramProps) => {
  const stream = getStream(updateShellState);
  const outputMsg = shellState.links.map((link) => link.name.trim()).join(TAB);
  stream.writeStdout(outputMsg);
  return;
};

const ls: Program = { name: "ls", run: runLs };

export default ls;
