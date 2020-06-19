import { Program, ProgramProps } from "../types/shell";
import { getStream } from "../utils/stream";
const runRm = ({ shellState, updateShellState, args }: ProgramProps) => {
  const stream = getStream(updateShellState);
  if (args.length === 0) {
    const msg = "rm: missing operand";
    stream.writeStderr(msg);
    return;
  }
  args.forEach((arg) => {
    const link = shellState.links.find((link) => link.name === arg);
    if (link) {
      updateShellState((draft) => {
        draft.links = draft.links.filter((link) => link.name !== arg);
      });
      return;
    }
    const msg = `rm: cannot remove '${arg}': No such key registered`;
    stream.writeStderr(msg);
  });
  return;
};

const rm: Program = { name: "rm", run: runRm };

export default rm;
