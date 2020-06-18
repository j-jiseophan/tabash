import { Program, ProgramProps } from "../types/shell";
import { toStdout } from "../utils/shell";
import { HELP_MSGS } from "../constants/help";
const runHelp = ({ updateShellState }: ProgramProps) => {
  HELP_MSGS.forEach((msg) => toStdout(msg, updateShellState));
  return;
};

const help: Program = { name: "help", run: runHelp };

export default help;
