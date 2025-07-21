import React from "react";
import HeaderComponent from "./wrap/HeaderComponent";
import MainComponent from "./wrap/MainComponent";
import FooterComponent from "./wrap/FooterComponent";
import TopModalComponent from "./wrap/TopModalComponent";
import ComfirmModalComponent from "./wrap/ComfirmModalComponent";
export default function WrapComponent(props) {
  return (
    <div id="wrap">
      <HeaderComponent />
      <MainComponent />
      <FooterComponent />
      <TopModalComponent />
      <ComfirmModalComponent />

      {/* 서브페이지 */}
    </div>
  );
}
