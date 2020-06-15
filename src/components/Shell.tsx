import React, { useState, useEffect, useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "../styles/Shell.scss";
import { rem2px } from "../utils/utils";

const Shell = () => {
  const [intputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollerRef = useRef<Scrollbars>(null);
  const [consoleHistory, setConsoleHistory] = useState<string[]>([]);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="shell" onClick={() => inputRef.current?.focus()}>
      <Scrollbars
        ref={scrollerRef}
        autoHeight
        autoHeightMax={rem2px(27)}
        onUpdate={scrollerRef.current?.scrollToBottom}
        style={{ width: "50%" }}
      >
        {consoleHistory.map((msg, index) => {
          return <p key={index}>{msg}</p>;
        })}
      </Scrollbars>

      <input
        ref={inputRef}
        value={`$  ${intputValue}`}
        onChange={(e) => setInputValue(e.target.value.substring(3))}
        onKeyDown={(e) => {
          if (e.key !== "Enter") {
            return;
          }
          setConsoleHistory([...consoleHistory, intputValue]);
          setInputValue("");
        }}
      />
    </div>
  );
};

export default Shell;
