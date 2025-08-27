import React, { forwardRef, useRef, useState } from "react";
import "./scss/Section2Component.scss";
const Section2Component = forwardRef((props, ref) => {
  const [state, setState] = React.useState({
    section: [],
  });
  const [arr, setArr] = useState([0, 0, 0]);
  React.useEffect(() => {
    fetch("./json/section2/section2.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setState({
          section: data.section,
        });
      });
    // .catch((err) => {alert(err)});
  }, []);
  return (
    <div id="section2Component" className="section" ref={ref}>
      <div className="inner">
        <ul>
          {state.section.map((el, idx) => (
            <li key={el.id}>
              <p className="number">{el.number}</p>
              <p className="text">{el.text.toLocaleString("ko-KR")}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
export default Section2Component;
