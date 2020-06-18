import { Program } from "../types/shell";
import ls from "../programs/ls";
import echo from "../programs/echo";
import help from "../programs/help";

export const programs: Program[] = [ls, echo, help];
