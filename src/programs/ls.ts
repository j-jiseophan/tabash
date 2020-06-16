import { Program, ShellProps } from "../types/shell";

const runLs = (props: ShellProps) => {
  console.log("run ls");
  return;
};

const ls: Program = { name: "ls", run: runLs };

export default ls;
