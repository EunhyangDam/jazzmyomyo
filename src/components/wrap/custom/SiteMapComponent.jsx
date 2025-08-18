import React from "react";
import { Link } from "react-router-dom";
import "./scss/SiteMapComponent.scss";
export default function SiteMapComponent({
  firstLink,
  firstName,
  secondLink,
  secondName,
}) {
  return (
    <div className="site">
      <Link to="/mainComponent">
        <i className="bi bi-house-fill"></i>
      </Link>
      <i className="fa-solid fa-angle-right"></i>
      <Link to={firstLink} className={secondLink || "now"}>
        {firstName}
      </Link>
      {secondLink && (
        <>
          <i className="fa-solid fa-angle-right"></i>
          <Link to={secondLink} className="now">
            {secondName}
          </Link>
        </>
      )}
    </div>
  );
}
