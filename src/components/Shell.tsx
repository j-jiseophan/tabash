import React, { useEffect, useRef, useContext } from "react";
import classnames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";
import "../styles/Shell.scss";
import { rem2px } from "../utils/utils";
import { consolePrefix } from "../constants/shell";
import { ShellProps } from "../types/shell";
import { ThemeContext } from "../contexts/theme";

const Shell = ({ shellState, updateShellState, runCommand }: ShellProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollerRef = useRef<Scrollbars>(null);
  const { isDarkMode } = useContext(ThemeContext);
  useEffect(() => {
    scrollerRef.current?.scrollToBottom();
  }, [shellState.stdout]);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div
      className={classnames("shell", {
        light: !isDarkMode,
      })}
      onClick={() => inputRef.current?.focus()}
    >
      <Scrollbars
        ref={scrollerRef}
        autoHeight
        autoHeightMax={rem2px(26.7)}
        style={{ width: "100%" }}
      >
        {shellState.stdout.map((msg: string, index: number) => {
          return (
            <p className="stdout" key={index}>
              {msg}
            </p>
          );
        })}
      </Scrollbars>

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
