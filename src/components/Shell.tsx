import React, { useState, useEffect, useRef } from "react";
import "../styles/Shell.scss";

const Shell = () => {
  const [intputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [consoleHistory, setConsoleHistory] = useState<string[]>([]);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="shell" onClick={() => inputRef.current?.focus()}>
      {consoleHistory.map((msg, index) => {
        return <p key={index}>{msg}</p>;
      })}
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
