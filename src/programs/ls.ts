import { Program, ProgramProps } from "../types/shell";
import { consolePrefix } from "../constants/shell";

const runLs = ({ state, actions, args, command }: ProgramProps) => {
  const outputMsg = state.links
    .map((link) => link.name.trim())
    .join("\u00A0\u00A0\u00A0\u00A0");
  actions.setConsoleHistory([
    ...state.consoleHistory,
    consolePrefix.concat(command),
    outputMsg,
  ]);
  return;
};

const ls: Program = { name: "ls", run: runLs };

export default ls;
