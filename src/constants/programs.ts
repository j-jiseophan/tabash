import { Program } from "../types/shell";
import ls from "../programs/ls";
import echo from "../programs/echo";
import help from "../programs/help";
import rm from "../programs/rm";

export const programs: Program[] = [ls, echo, help, rm];
