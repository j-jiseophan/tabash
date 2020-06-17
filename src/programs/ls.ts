import { Program, ProgramProps } from "../types/shell";
import { consolePrefix } from "../constants/shell";

const runLs = ({
  shellState,
  updateShellState,
  args,
  command,
}: ProgramProps) => {
  const outputMsg = shellState.links
    .map((link) => link.name.trim())
    .join("\u00A0\u00A0\u00A0\u00A0");
  updateShellState((draft) => {
    draft.consoleHistory.push(consolePrefix.concat(command));
    draft.consoleHistory.push(outputMsg);
  });
  return;
};

const ls: Program = { name: "ls", run: runLs };

export default ls;
