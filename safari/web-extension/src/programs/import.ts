import { Program, ProgramProps } from "../types/shell";
import { getStream } from "../utils/stream";

const rumEmport = ({ updateShellState, args }: ProgramProps) => {
  const stream = getStream(updateShellState);
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "json";
  input.click();
  input.onchange = () => {
    const files = input.files;
    if (!files || files.length === 0) {
      stream.writeStderr("failed to import json file");
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = JSON.parse(reader.result as string);
      updateShellState((draft) => {
        draft.links = json;
      });
      localStorage.setItem("links", json);
    };
    reader.readAsText(file);
    stream.writeStdout("json file successfully imported");
  };
  input.remove();
  return;
};

const mport: Program = { name: "import", run: rumEmport };

export default mport;
