import React from "react";
import HeaderComponent from "./Wrap/HeaderComponent";
import MainComponent from "./Wrap/MainComponent";
import FooterComponent from "./Wrap/FooterComponent";
export default function WrapComponent(props) {
  return (
    <div id="wrap">
      <HeaderComponent />
      <MainComponent />
      <FooterComponent />
    </div>
  );
}
