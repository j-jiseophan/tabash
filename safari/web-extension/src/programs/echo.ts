import { Program, ProgramProps } from "../types/shell";
import { WHITESPACE } from "../constants/shell";
import { getStream } from "../utils/stream";

const runEcho = ({ updateShellState, args }: ProgramProps) => {
  const msg = args.join(WHITESPACE);
  const stream = getStream(updateShellState);
  stream.writeStdout(msg);
  return;
};

const echo: Program = { name: "echo", run: runEcho };

export default echo;
