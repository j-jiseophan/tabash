import { Program, ProgramProps, Link } from "../types/shell";
import { getStream } from "../utils/stream";
import { programs } from "../constants/programs";
const runMv = ({ shellState, updateShellState, args }: ProgramProps) => {
  const stream = getStream(updateShellState);
  const currentName = args[0];
  const newName = args[1];
  if (args.length === 0) {
    const msg = "mv: missing operand";
    stream.writeStderr(msg);
    return;
  }
  if (args.length === 1) {
    const msg = `mv: missing destination operand after '${currentName}'`;
    stream.writeStderr(msg);
    return;
  }
  if (args.length > 2) {
    const msg = `mv: unexpected token '${args[2]}'`;
    stream.writeStderr(msg);
    return;
  }
  const link = shellState.links.find((link) => link.name === currentName);
  if (!link) {
    const msg = `mv: cannot move '${currentName}': No such key registered`;
    stream.writeStderr(msg);
    return;
  }
  if (programs.find((program) => program.name === newName)) {
    const msg = `mv: cannot move '${currentName}': '${newName}' is reserved for program`;
    stream.writeStderr(msg);
    return;
  }
  updateShellState((draft) => {
    const currentLink = draft.links.find((link) => link.name === args[0]);
    if (!currentLink) {
      throw new Error(`${currentName} is lost`);
    }

    draft.links = draft.links.filter(
      (link) => [currentName, newName].includes(link.name) === false
    );
    const newLink: Link = { name: newName, url: currentLink.url };
    draft.links.push(newLink);
  });

  return;
};

const mv: Program = { name: "mv", run: runMv };

export default mv;
