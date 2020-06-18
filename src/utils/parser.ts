import { breakerChars } from "../constants/parser";

export const tokenize = (command: string) => {
  const tokens = [];
  let current = "";
  for (const c of command) {
    if (/\s/.test(c)) {
      if (current.length > 0) {
        tokens.push(current);
        current = "";
      } else {
        continue;
      }
    } else if (breakerChars.includes(c)) {
      if (current.length > 0) {
        tokens.push(current);
        current = "";
      }
      tokens.push(c);
    } else {
      current += c;
    }
  }
  if (current.length > 0) {
    tokens.push(current);
  }
  return tokens;
};
