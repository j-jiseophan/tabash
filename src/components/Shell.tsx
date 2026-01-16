import React, { useEffect, useRef, useContext } from "react";
import classnames from "classnames";
import "../styles/Shell.scss";
import { consolePrefix } from "../constants/shell";
import { ShellProps } from "../types/shell";
import { ThemeContext } from "../contexts/theme";

const Shell = ({ shellState, updateShellState, runCommand }: ShellProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
    }
  }, [shellState.stdout]);


  useEffect(()=>{
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.key === "x") {
        e.preventDefault();
        e.stopPropagation();
        inputRef.current?.focus();
      }
    })
  },[])

  return (
    <div
      className={classnames("shell", {
        light: !isDarkMode,
      })}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollerRef}
        className="shell-output"
      >
        {shellState.stdout.map((msg: string, index: number) => {
          return (
            <p className="stdout" key={index}>
              {msg}
            </p>
          );
        })}
      </div>

      <input
        ref={inputRef}
        value={`${consolePrefix}${shellState.stdin.currentValue}`}
        onChange={(e) => {
          const inputValue = e.target.value.substring(consolePrefix.length);
          updateShellState((draft) => {
            draft.stdin.currentValue = inputValue;
          });
        }}
        onKeyDown={(e) => {
          if (
            e.key === "ArrowLeft" &&
            (inputRef.current?.selectionStart || -1) <= consolePrefix.length
          ) {
            e.preventDefault();
            return;
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            updateShellState((draft) => {
              draft.stdin.currentValue =
                draft.stdin.history[
                  draft.stdin.history.length - 1 - draft.stdin.historyBackIndex
                ] || "";
              draft.stdin.historyBackIndex = Math.min(
                draft.stdin.historyBackIndex + 1,
                draft.stdin.history.length - 1
              );
            });
            return;
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            updateShellState((draft) => {
              draft.stdin.currentValue =
                draft.stdin.history[
                  draft.stdin.history.length -
                    1 -
                    (draft.stdin.historyBackIndex - 1)
                ] || "";
              draft.stdin.historyBackIndex = Math.max(
                draft.stdin.historyBackIndex - 1,
                0
              );
            });
            return;
          }
          if (e.key === "Tab" && shellState.stdin.currentValue.length > 0) {
            e.preventDefault();
            const link = shellState.links.find((link) =>
              link.name.startsWith(shellState.stdin.currentValue)
            );
            if (!link) {
              return;
            }
            updateShellState((draft) => {
              draft.stdin.currentValue = link.name;
            });
            return;
          }
          if (e.key === "Enter") {
            updateShellState((draft) => {
              draft.stdin.currentValue = "";
              draft.stdin.historyBackIndex = 0;
              draft.stdin.history.push(shellState.stdin.currentValue);
            });
            runCommand(shellState.stdin.currentValue);
            return;
          }
        }}
        onMouseDown={(e) => e.preventDefault()}
        spellCheck={false}
      />
    </div>
  );
};

export default Shell;
