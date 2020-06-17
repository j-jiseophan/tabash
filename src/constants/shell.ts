import { Link } from "../types/shell";
import { browserName } from "../utils/utils";

export const consolePrefix = `joy@${browserName} $ `;

export const defaultLinks: Link[] = [
  { name: "jsh", url: "jiseophan.com" },
  { name: "gg", url: "google.com" },
];
