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
import { Route, Routes } from "react-router-dom";
import "./scss/WrapComponent.scss";
export default function WrapComponent(props) {
  return (
    <div id="wrap">
      <Routes>
        <Route path="/" element={<HeaderComponent />}>
          <Route index element={<MainComponent />} />
          {/* 서브페이지 */}
          <Route path="/mainComponent" element={<MainComponent />} />
          <Route path="/About" element={<Sub01About />} />
          <Route path="/AboutUs" element={<Sub01AboutUs />} />
          <Route path="/Interior" element={<Sub01Interior />} />
          <Route path="/MyoMyo" element={<Sub01MyoMyo />} />
          <Route path="/Story" element={<Sub01Story />} />
          <Route path="/Disc" element={<Sub02Disc />} />
          <Route path="/Merch" element={<Sub02Merch />} />
          <Route path="/Merch01" element={<Sub02Merch01 />} />
          <Route path="/Shop" element={<Sub02Shop />} />
          <Route path="/Menu" element={<Sub030Menu />} />
          <Route path="/Wine" element={<Sub031Wine />} />
          <Route path="/Drinks" element={<Sub032Drinks />} />
          <Route path="/Food" element={<Sub033Food />} />
          <Route path="/Set" element={<Sub034Set />} />
          <Route path="/Pre" element={<Sub035Pre />} />
          <Route path="/AboutLive" element={<Sub04AboutLive />} />
          <Route path="/Artist" element={<Sub04Artist />} />
          <Route path="/BuyTicket" element={<Sub04BuyTicket />} />
          <Route path="/Lental" element={<Sub04Lental />} />
          <Route path="/Monthly" element={<Sub04Monthly />} />
          <Route path="/Faq" element={<Sub05Faq />} />
          <Route path="/Gall" element={<Sub05Gall />} />
          <Route path="/Ntc" element={<Sub05Ntc />} />
          <Route path="/Rev" element={<Sub05Rev />} />
          <Route path="/Sns" element={<Sub05Sns />} />
          <Route path="/Lg" element={<Sub06Lg />} />
          <Route path="/SearchId" element={<Sub06SearchId />} />
          <Route path="/SearchRs" element={<Sub06SearchRs />} />
          <Route path="/DeleteAccount" element={<Sub07DeleteAccount />} />
          <Route path="/EditProfile" element={<Sub07EditProfile />} />
          <Route path="/Mp" element={<Sub07Mp />} />
          <Route path="/MyOrder" element={<Sub07MyOrder />} />
          <Route path="/MyProfile" element={<Sub07MyProfile />} />
          <Route path="/Mm" element={<Sub080Mm />} />
          <Route path="/MmList" element={<Sub081MmList />} />
          <Route path="/MmDetail" element={<Sub082MmDetail />} />
          <Route path="/MmEdit" element={<Sub083MmEdit />} />
          <Route path="/MmGrade" element={<Sub084MmGrade />} />
          <Route path="/Cart" element={<Sub09Cart />} />
          <Route path="/TopModalComponent" element={<TopModalComponent />} />
          <Route
            path="/ComfirmModalComponent"
            element={<ComfirmModalComponent />}
          />
        </Route>
      </Routes>
      <FooterComponent />
    </div>
  );
}
