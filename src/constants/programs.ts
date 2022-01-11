import { Program } from "../types/shell";
import ls from "../programs/ls";
import echo from "../programs/echo";
import help from "../programs/help";
import rm from "../programs/rm";
import mv from "../programs/mv";
import tire from "../programs/tire";
import clear from "../programs/clear";
import xport from "../programs/export";
import google from "../programs/google";

export const programs: Program[] = [
  ls,
  echo,
  help,
  rm,
  mv,
  tire,
  clear,
  xport,
  google,
];

export const PACAKGE_PREFIX = "pkg_";
