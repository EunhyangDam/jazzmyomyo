import React from "react";
import HeaderComponent from "./wrap/HeaderComponent";
import MainComponent from "./wrap/MainComponent";
import FooterComponent from "./wrap/FooterComponent";
import TopModalComponent from "./wrap/TopModalComponent";
import ComfirmModalComponent from "./wrap/ComfirmModalComponent";
import Sub01About from "./wrap/sub/sub01AboutUs/Sub01About";
import Sub01AboutUs from "./wrap/sub/sub01AboutUs/Sub01AboutUs";
import Sub01Interior from "./wrap/sub/sub01AboutUs/Sub01Interior";
import Sub01MyoMyo from "./wrap/sub/sub01AboutUs/Sub01MyoMyo";
import Sub01Story from "./wrap/sub/sub01AboutUs/Sub01Story";
import Sub02Disc from "./wrap/sub/sub02Shop/Sub02Disc";
import Sub02Merch from "./wrap/sub/sub02Shop/Sub02Merch";
import Sub02Merch01 from "./wrap/sub/sub02Shop/Sub02Merch01";
import Sub02Shop from "./wrap/sub/sub02Shop/Sub02Shop";
import Sub030Menu from "./wrap/sub/sub03Menu/Sub030Menu";
import Sub031Wine from "./wrap/sub/sub03Menu/Sub031Wine";
import Sub032Drinks from "./wrap/sub/sub03Menu/Sub032Drinks";
import Sub033Food from "./wrap/sub/sub03Menu/Sub033Food";
import Sub034Set from "./wrap/sub/sub03Menu/Sub034Set";
import Sub035Pre from "./wrap/sub/sub03Menu/Sub035Pre";
import Sub04AboutLive from "./wrap/sub/sub04Schedule/Sub04AboutLive";
import Sub04Artist from "./wrap/sub/sub04Schedule/Sub04Artist";
import Sub04BuyTicket from "./wrap/sub/sub04Schedule/Sub04BuyTicket ";
import Sub04Lental from "./wrap/sub/sub04Schedule/Sub04Lental";
import Sub04Monthly from "./wrap/sub/sub04Schedule/Sub04Monthly";
import Sub05Faq from "./wrap/sub/sub05Community.jsx/Sub05Faq";
import Sub05Gall from "./wrap/sub/sub05Community.jsx/Sub05Gall";
import Sub05Ntc from "./wrap/sub/sub05Community.jsx/Sub05Ntc";
import Sub05Rev from "./wrap/sub/sub05Community.jsx/Sub05Rev";
import Sub05Sns from "./wrap/sub/sub05Community.jsx/Sub05Sns";
import Sub06Lg from "./wrap/sub/sub06Lg/Sub06Lg";
import Sub06SearchId from "./wrap/sub/sub06Lg/Sub06SearchId";
import Sub06SearchRs from "./wrap/sub/sub06Lg/Sub06SearchRs";
import Sub07DeleteAccount from "./wrap/sub/sub07Mp/Sub07DeleteAccount";
import Sub07EditProfile from "./wrap/sub/sub07Mp/Sub07EditProfile";
import Sub07Mp from "./wrap/sub/sub07Mp/Sub07Mp";
import Sub07MyOrder from "./wrap/sub/sub07Mp/Sub07MyOrder";
import Sub07MyProfile from "./wrap/sub/sub07Mp/Sub07MyProfile";
import Sub080Mm from "./wrap/sub/sub08Mm/Sub080Mm";
import Sub081MmList from "./wrap/sub/sub08Mm/Sub081MmList";
import Sub082MmDetail from "./wrap/sub/sub08Mm/Sub082MmDetail";
import Sub083MmEdit from "./wrap/sub/sub08Mm/Sub083MmEdit";
import Sub084MmGrade from "./wrap/sub/sub08Mm/Sub084MmGrade";
import Sub09Cart from "./wrap/sub/sub09Cart/Sub09Cart";
export default function WrapComponent(props) {
  return (
    <div id="wrap">
      <HeaderComponent />
      <MainComponent />
      <FooterComponent />
      <TopModalComponent />
      <ComfirmModalComponent />

      {/* 서브페이지 */}
      <Sub01About />
      <Sub01AboutUs />
      <Sub01Interior />
      <Sub01MyoMyo />
      <Sub01Story />
      <Sub02Disc />
      <Sub02Merch />
      <Sub02Merch01 />
      <Sub02Shop />
      <Sub030Menu />
      <Sub031Wine />
      <Sub032Drinks />
      <Sub033Food />
      <Sub034Set />
      <Sub035Pre />
      <Sub04AboutLive />
      <Sub04Artist />
      <Sub04BuyTicket />
      <Sub04Lental />
      <Sub04Monthly />
      <Sub05Faq />
      <Sub05Gall />
      <Sub05Ntc />
      <Sub05Rev />
      <Sub05Sns />
      <Sub06Lg />
      <Sub06SearchId />
      <Sub06SearchRs />
      <Sub07DeleteAccount />
      <Sub07EditProfile />
      <Sub07Mp />
      <Sub07MyOrder />
      <Sub07MyProfile />
      <Sub080Mm />
      <Sub081MmList />
      <Sub082MmDetail />
      <Sub083MmEdit />
      <Sub084MmGrade />
      <Sub09Cart />
    </div>
  );
}
