import { Link } from "../types/shell";
import { browserName } from "../utils/utils";
import { version } from "../../package.json";

export const WELCOME_GUIDES = [
  `🪐 tabash ${version}`,
  `Type "help" and check for avaliable commands.`,
];

export const consolePrefix = `joy@${browserName} $ `;

export const defaultLinks: Link[] = [
  { name: "jsh", url: "jiseophan.com" },
  { name: "gg", url: "google.com" },
];

export const WHITESPACE = "\u00A0";
export const TAB = WHITESPACE.repeat(4);
