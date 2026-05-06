import { Program, ProgramProps } from "../types/shell";
import { getStream } from "../utils/stream";
import { HELP_MSGS } from "../constants/help";
const runHelp = ({ updateShellState }: ProgramProps) => {
  const stream = getStream(updateShellState);
  HELP_MSGS.forEach((msg) => stream.writeStdout(msg));
  return;
};

const help: Program = { name: "help", run: runHelp };

export default help;
