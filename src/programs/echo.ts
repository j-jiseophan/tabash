import { Program, ProgramProps, Link } from "../types/shell";
import { WHITESPACE } from "../constants/shell";
import { toStdout } from "../utils/shell";
import { SYMBOL_REPLACER_STATE } from "../types/echo";

const runEcho = ({ shellState, updateShellState, args }: ProgramProps) => {
  const msg = args
    .map((arg) => replaceSymbol(arg, shellState.links))
    .join(WHITESPACE);
  toStdout(msg, updateShellState);
  return;
};

export const replaceSymbol = (token: string, links: Link[]) => {
  let state: SYMBOL_REPLACER_STATE = SYMBOL_REPLACER_STATE.START;
  let s = "";
  const results = [];
  for (const c of token) {
    switch (state as SYMBOL_REPLACER_STATE) {
      case SYMBOL_REPLACER_STATE.START: {
        if (c === "$") {
          state = SYMBOL_REPLACER_STATE.SYMBOL;
        } else {
          state = SYMBOL_REPLACER_STATE.STRING;
          s += c;
        }
        break;
      }
      case SYMBOL_REPLACER_STATE.STRING: {
        if (c === "$") {
          results.push(s);
          s = "";
          state = SYMBOL_REPLACER_STATE.SYMBOL;
        } else {
          s += c;
        }
        break;
      }
      case SYMBOL_REPLACER_STATE.SYMBOL: {
        if (c === "$") {
          state = SYMBOL_REPLACER_STATE.SYMBOL;
          const url = links.find((link) => link.name === s)?.url || "";
          results.push(url);
          s = "";
        } else {
          s += c;
        }
        break;
      }
    }
  }
  if (s.length > 0) {
    if (state === SYMBOL_REPLACER_STATE.STRING) {
      results.push(s);
    } else if (state === SYMBOL_REPLACER_STATE.SYMBOL) {
      const url = links.find((link) => link.name === s)?.url || "";
      results.push(url);
    }
  }
  return results.join("");
};

const echo: Program = { name: "echo", run: runEcho };

export default echo;
