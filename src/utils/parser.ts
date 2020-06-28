import { Link } from "../types/shell";
import { SYMBOL_REPLACER_STATE as SYMBOL_MAPPER_STATE } from "../types/parser";

export const parseCommand = (command: string, links: Link[]) => {
  const tokens = tokenize(command);
  const mappedTokens = tokens.map((token) => mapSymbol(token, links));
  return mappedTokens;
};

export const tokenize = (command: string) => {
  const tokens = [];
  let current = "";
  let breakOnEqual = true;
  for (const c of command) {
    if (/\s/.test(c)) {
      if (current.length > 0) {
        tokens.push(current);
        current = "";
      } else {
        continue;
      }
    } else if (c === "=" && breakOnEqual) {
      if (current.length > 0) {
        tokens.push(current);
        current = "";
      }
      tokens.push(c);
      breakOnEqual = false;
    } else {
      current += c;
    }
  }
  if (current.length > 0) {
    tokens.push(current);
  }
  return tokens;
};

export const mapSymbol = (token: string, links: Link[]) => {
  let state: SYMBOL_MAPPER_STATE = SYMBOL_MAPPER_STATE.START;
  let s = "";
  const results = [];
  for (const c of token) {
    switch (state as SYMBOL_MAPPER_STATE) {
      case SYMBOL_MAPPER_STATE.START: {
        if (c === "$") {
          state = SYMBOL_MAPPER_STATE.SYMBOL;
        } else {
          state = SYMBOL_MAPPER_STATE.STRING;
          s += c;
        }
        break;
      }
      case SYMBOL_MAPPER_STATE.STRING: {
        if (c === "$") {
          results.push(s);
          s = "";
          state = SYMBOL_MAPPER_STATE.SYMBOL;
        } else {
          s += c;
        }
        break;
      }
      case SYMBOL_MAPPER_STATE.SYMBOL: {
        if (c === "$") {
          state = SYMBOL_MAPPER_STATE.SYMBOL;
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
    if (state === SYMBOL_MAPPER_STATE.STRING) {
      results.push(s);
    } else if (state === SYMBOL_MAPPER_STATE.SYMBOL) {
      const url = links.find((link) => link.name === s)?.url || "";
      results.push(url);
    }
  }
  return results.join("");
};
