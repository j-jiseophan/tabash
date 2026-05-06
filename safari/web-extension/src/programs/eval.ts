import { EvalProgramProps } from "../types/shell";
import { getStream } from "../utils/stream";
import { PACAKGE_PREFIX } from "../constants/programs";
const runEval = ({
  shellState,
  updateShellState,
  args,
  packageName,
}: EvalProgramProps) => {
  const stream = getStream(updateShellState);
  const code = localStorage.getItem(`${PACAKGE_PREFIX}${packageName}`);
  if (!code) {
    const msg = `Error: failed to run ${packageName}`;
    stream.writeStderr(msg);
    return;
  }
  eval(code);
  return;
};

export default runEval;
