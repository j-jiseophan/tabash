import React, { useState, useEffect, useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "../styles/Shell.scss";
import { rem2px } from "../utils/utils";
import { consolePrefix } from "../constants/constants";

const Shell = () => {
  const [intputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollerRef = useRef<Scrollbars>(null);
  const [consoleHistory, setConsoleHistory] = useState<string[]>([]);
  useEffect(() => {
    scrollerRef.current?.scrollToBottom();
  }, [consoleHistory]);
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
        {consoleHistory.map((msg, index) => {
          return <p key={index}>{msg}</p>;
        })}
      </Scrollbars>

      <input
        ref={inputRef}
        value={`${consolePrefix}${intputValue}`}
        onChange={(e) =>
          setInputValue(e.target.value.substring(consolePrefix.length))
        }
        onKeyDown={(e) => {
          if (e.key !== "Enter") {
            return;
          }
          setConsoleHistory([
            ...consoleHistory,
            consolePrefix.concat(intputValue),
          ]);
          setInputValue("");
        }}
      />
    </div>
  );
};

export default Shell;
