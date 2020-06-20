import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import Shell from "./Shell";
import { parseCommand } from "../utils/parser";
import { programs, PACAKGE_PREFIX } from "../constants/programs";
import { ShellState, Link } from "../types/shell";
import {
  defaultLinks,
  consolePrefix,
  WELCOME_GUIDES,
} from "../constants/shell";
import { getStream } from "../utils/stream";
import { removeProtocol } from "../utils/utils";
import runEval from "../programs/eval";

const ShellWrapper = () => {
  const [shellState, updateShellState] = useImmer<ShellState>({
    stdout: WELCOME_GUIDES,
    stdin: {
      currentValue: "",
      history: [],
      historyBackIndex: 0,
    },
    links: defaultLinks,
  });
  const stream = getStream(updateShellState);

  useEffect(() => {
    const savedLinks = localStorage.getItem("links");
    if (savedLinks) {
      updateShellState((draft) => {
        draft.links = JSON.parse(savedLinks);
      });
    }
  }, [updateShellState]);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(shellState.links));
  }, [shellState.links]);

  const runCommand = (command: string) => {
    const tokens = parseCommand(command, shellState.links);
    stream.writeStdout(consolePrefix.concat(command));

    // case 0: empty string
    if (command.length === 0) {
      return;
    }

    // case 1: run program
    const program = programs.find((program) => program.name === tokens[0]);
    if (program) {
      if (tokens[1] === "=") {
        stream.writeStderr(`Error: '${tokens[0]}' is reserved for program`);

        return;
      }
      program.run({
        shellState,
        updateShellState,
        args: tokens.slice(1),
      });
      return;
    }

    // case 2: run package
    const hasPackage = Object.keys(localStorage).includes(
      `${PACAKGE_PREFIX}${tokens[0]}`
    );
    if (hasPackage) {
      runEval({
        shellState,
        updateShellState,
        args: tokens.slice(1),
        packageName: tokens[0],
      });
      return;
    }

    //case 3: add link
    if (tokens[1] === "=") {
      if (tokens.length > 3) {
        stream.writeStderr(`Error: unexpected token '${tokens[3]}'`);
        return;
      }
      const url = removeProtocol(tokens[2]);
      const prevLink = shellState.links.find((link) => link.name === tokens[0]);
      const link: Link = { name: tokens[0], url };
      if (prevLink) {
        updateShellState((draft) => {
          draft.links = draft.links.map((l) =>
            l.name === tokens[0] ? link : l
          );
        });
      } else {
        updateShellState((draft) => {
          draft.links.push(link);
        });
      }
      stream.writeStdout(`${link.name} -> ${url}`);

      return;
    }

    // case 4: go link
    const link = shellState.links.find((link) => link.name === tokens[0]);
    if (link) {
      window.location.href = `https://${link.url}`;
      return;
    }

    // case 5: command not found
    stream.writeStderr(`${tokens[0]}: command not found`);
  };
  return (
    <Shell
      shellState={shellState}
      updateShellState={updateShellState}
      runCommand={runCommand}
    />
  );
};

export default ShellWrapper;
