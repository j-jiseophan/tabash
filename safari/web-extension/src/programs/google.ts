import { Program, ProgramProps } from "../types/shell";
import { getStream } from "../utils/stream";

const runGoogle = ({ updateShellState, args }: ProgramProps) => {
  const stream = getStream(updateShellState);
  if (args.length === 0) {
    const msg = "g: missing keyword";
    stream.writeStderr(msg);
  }
  window.location.href = `https://www.google.com/search?q=${args.join(" ")}`;
  return;
};

const google: Program = { name: "g", run: runGoogle };

export default google;
