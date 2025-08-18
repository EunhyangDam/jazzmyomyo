import React from "react";

export default function SplitText({ text }) {
  return (
    <span>
      {text.split("").map((char, i) => (
        <span key={i} className="char">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
