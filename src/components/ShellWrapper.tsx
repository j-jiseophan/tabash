import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import Shell from "./Shell";
import { tokenize } from "../utils/parser";
import { programs } from "../constants/programs";
import { ShellState, Link } from "../types/shell";
import {
  defaultLinks,
  consolePrefix,
  WELCOME_GUIDES,
} from "../constants/shell";
import { toStdout, toStderr } from "../utils/shell";
import { removeProtocol } from "../utils/utils";

const ShellWrapper = () => {
  const [shellState, updateShellState] = useImmer<ShellState>({
    stdout: WELCOME_GUIDES,
    inputValue: "",
    links: defaultLinks,
  });

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
    const tokens = tokenize(command);
    const program = programs.find((program) => program.name === tokens[0]);

    toStdout(consolePrefix.concat(command), updateShellState);

    // case 0: empty string
    if (command.length === 0) {
      return;
    }

    // case 1: run program
    if (program) {
      if (tokens[1] === "=") {
        toStderr(
          `Error: "${tokens[0]}" is reserved for program`,
          updateShellState
        );

        return;
      }
      program.run({
        shellState,
        updateShellState,
        args: tokens.slice(1),
      });
      return;
    }
    //case 2: add link
    if (tokens[1] === "=") {
      if (tokens.length > 3) {
        toStderr(`Error: unexpected token "${tokens[3]}"`, updateShellState);
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
      toStdout(`${link.name} -> ${url}`, updateShellState);

      return;
    }

    // case 3: go link
    const link = shellState.links.find((link) => link.name === tokens[0]);
    if (link) {
      window.location.href = `https://${link.url}`;
      return;
    }

    // case 4: command not found
    toStderr(`${tokens[0]}: command not found`, updateShellState);
  };
  return (
    <>
      <Shell
        shellState={shellState}
        updateShellState={updateShellState}
        runCommand={runCommand}
      />
    </>
  );
};

export default ShellWrapper;
