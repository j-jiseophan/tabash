import { Program, ProgramProps } from "../types/shell";
import { getStream } from "../utils/stream";
import { PACAKGE_PREFIX } from "../constants/programs";
const runTire = async ({ updateShellState, args }: ProgramProps) => {
  const stream = getStream(updateShellState);
  if (args.length !== 2 || args[0] !== "install") {
    const msg = 'Error: try again with "tire install [package-name]"';
    stream.writeStderr(msg);
    return;
  }
  const packageName = args[1];
  if (localStorage.getItem(`${PACAKGE_PREFIX}${packageName}`)) {
    const msg = `Error: ${packageName} is already installed`;
    stream.writeStderr(msg);
    return;
  }
  const msg = `Installing ...`;
  stream.writeStdout(msg);
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/jshan2017/tire/master/packages/${packageName}.js`
    );
    if (res.status === 404) {
      const msg = `Error: failed to install ${packageName}, package not found.`;
      stream.writeStderr(msg);
      return;
    }
    const code = await res.text();
    localStorage.setItem(`${PACAKGE_PREFIX}${packageName}`, code);
    const msg = "Done!";
    stream.writeStdout(msg);
  } catch {
    const msg = `Error: failed to install ${packageName}`;
    stream.writeStderr(msg);
  }
};

const tire: Program = { name: "tire", run: runTire };

export default tire;
