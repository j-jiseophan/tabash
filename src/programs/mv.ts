import { Program, ProgramProps, Link } from "../types/shell";
import { toStderr } from "../utils/shell";
import { programs } from "../constants/programs";
const runMv = ({ shellState, updateShellState, args }: ProgramProps) => {
  const currentName = args[0];
  const newName = args[1];
  if (args.length === 0) {
    const msg = "mv: missing operand";
    toStderr(msg, updateShellState);
    return;
  }
  if (args.length === 1) {
    const msg = `mv: missing destination operand after '${currentName}'`;
    toStderr(msg, updateShellState);
    return;
  }
  if (args.length > 2) {
    const msg = `mv: unexpected token '${args[2]}'`;
    toStderr(msg, updateShellState);
    return;
  }
  const link = shellState.links.find((link) => link.name === currentName);
  if (!link) {
    const msg = `mv: cannot move '${currentName}': No such key registered`;
    toStderr(msg, updateShellState);
    return;
  }
  if (programs.find((program) => program.name === newName)) {
    const msg = `mv: cannot move '${currentName}': '${newName}' is reserved for program`;
    toStderr(msg, updateShellState);
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
