import { Program } from "../types/shell";
import ls from "../programs/ls";
import echo from "../programs/echo";
import help from "../programs/help";
import rm from "../programs/rm";
import mv from "../programs/mv";
import clear from "../programs/clear";
import xport from "../programs/export";
import mport from "../programs/import";
import google from "../programs/google";
import setWallpaper from "../programs/set-wallpaper";

export const programs: Program[] = [
  ls,
  echo,
  help,
  rm,
  mv,
  clear,
  xport,
  mport,
  google,
  setWallpaper,
];

export const PACAKGE_PREFIX = "pkg_";
