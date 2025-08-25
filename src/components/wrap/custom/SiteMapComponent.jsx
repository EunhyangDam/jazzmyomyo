import React from "react";
import { Link } from "react-router-dom";
import "./scss/SiteMapComponent.scss";
import useCustomA from "./useCustomA";
export default function SiteMapComponent({
  firstLink,
  firstName,
  secondLink,
  secondName,
}) {
  const { onClickA } = useCustomA();
  return (
    <div className="site">
      <a href="!#" onClick={(e) => onClickA(e, "/mainComponent")}>
        <i className="bi bi-house-fill"></i>
      </a>
      <i className="fa-solid fa-angle-right"></i>
      <a
        href="!#"
        className={secondLink || "now"}
        onClick={(e) => onClickA(e, firstLink)}
      >
        {firstName}
      </a>
      {secondLink && (
        <>
          <i className="fa-solid fa-angle-right"></i>
          <a className="now" onClick={(e) => onClickA(e, secondLink)}>
            {secondName}
          </a>
        </>
      )}
    </div>
  );
}
