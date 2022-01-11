import { Program, ProgramProps } from "../types/shell";
import { getStream } from "../utils/stream";
import { format } from "date-fns";

const runExport = ({ updateShellState, args }: ProgramProps) => {
  const data =
    "text/json;charset=utf-8," +
    encodeURIComponent(localStorage.getItem("links") as string);
  const url = "data:" + data;
  const date = format(new Date(), "yyyy-MM-dd");

  const a = document.createElement("a");
  a.style.display = "none";
  a.href = a.href = url;
  a.download = `tabash-${date}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
  const stream = getStream(updateShellState);
  stream.writeStdout("json file downloaded");
  return;
};

const xport: Program = { name: "export", run: runExport };

export default xport;
