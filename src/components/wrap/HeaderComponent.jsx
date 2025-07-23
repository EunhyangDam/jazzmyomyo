import React from "react";
import { Outlet } from "react-router-dom";

export default function HeaderComponent(props) {
  return (
    <>
      <header id="header"></header>
      <Outlet />
    </>
  );
}
