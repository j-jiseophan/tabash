import React, { useEffect, useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "../styles/Shell.scss";
import { rem2px } from "../utils/utils";
import { consolePrefix } from "../constants/constants";
import { ShellProps } from "../types/shell";

const Shell = ({ state, actions }: ShellProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollerRef = useRef<Scrollbars>(null);
  useEffect(() => {
    scrollerRef.current?.scrollToBottom();
  }, [state.consoleHistory]);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="shell" onClick={() => inputRef.current?.focus()}>
      <Scrollbars
        ref={scrollerRef}
        autoHeight
        autoHeightMax={rem2px(26.7)}
        style={{ width: "100%" }}
      >
        {state.consoleHistory.map((msg: string, index: number) => {
          return <p key={index}>{msg}</p>;
        })}
      </Scrollbars>

      <input
        ref={inputRef}
        value={`${consolePrefix}${state.inputValue}`}
        onChange={(e) =>
          actions.setInputValue(e.target.value.substring(consolePrefix.length))
        }
        onKeyDown={(e) => {
          if (e.key !== "Enter") {
            return;
          }
          actions.setConsoleHistory([
            ...state.consoleHistory,
            consolePrefix.concat(state.inputValue),
          ]);
          actions.setInputValue("");
        }}
      />
    </div>
  );
};

export default Shell;
