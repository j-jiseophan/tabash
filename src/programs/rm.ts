import { Program, ProgramProps } from "../types/shell";
import { toStderr } from "../utils/shell";
const runRm = ({ shellState, updateShellState, args }: ProgramProps) => {
  if (args.length === 0) {
    const msg = "rm: missing operand";
    toStderr(msg, updateShellState);
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
    toStderr(msg, updateShellState);
  });
  return;
};

const rm: Program = { name: "rm", run: runRm };

export default rm;
