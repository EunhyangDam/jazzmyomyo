import React, { useState } from "react";
import "./scss/Section2Component.scss";
export default function Section2Component(props) {
  const [state, setState] = React.useState({
    section: [],
  });
  React.useEffect(() => {
    fetch("./json/section2/section2.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setState({
          section: data.section,
        });
      })
      .catch((err) => alert(err));
  }, []);
  return (
    <div id="section2Component" className="section">
      <div className="inner">
        <ul>
          {state.section.map((el) => (
            <li>
              <p className="number">{el.number}</p>
              <p className="text">{el.text.toLocaleString("ko-KR")}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
