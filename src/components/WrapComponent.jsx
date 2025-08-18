import React, { useEffect } from "react";
import HeaderComponent from "./wrap/HeaderComponent";
import MainComponent from "./wrap/MainComponent";
import FooterComponent from "./wrap/FooterComponent";
import Sub01AboutUs from "./wrap/sub/sub01AboutUs/Sub01AboutUs";
import Sub01Interior from "./wrap/sub/sub01AboutUs/Sub01Interior";
import Sub01MyoMyo from "./wrap/sub/sub01AboutUs/Sub01MyoMyo";
import Sub01Story from "./wrap/sub/sub01AboutUs/Sub01Story";
import Sub02ShopDetail from "./wrap/sub/sub02Shop/Sub02ShopDetail";
import Sub02Shop from "./wrap/sub/sub02Shop/Sub02Shop";
import Sub030Menu from "./wrap/sub/sub03Menu/Sub030Menu";
import Sub031Wine from "./wrap/sub/sub03Menu/Sub031Wine";
import Sub032Drinks from "./wrap/sub/sub03Menu/Sub032Drinks";
import Sub033Food from "./wrap/sub/sub03Menu/Sub033Food";
import Sub034Set from "./wrap/sub/sub03Menu/Sub034Set";
import Sub035Pre from "./wrap/sub/sub03Menu/Sub035Pre";
import Sub035PreView from "./wrap/sub/sub03Menu/Sub035PreView";
import Sub035PreWrite from "./wrap/sub/sub03Menu/Sub035PreWrite";
import Sub035PreEdit from "./wrap/sub/sub03Menu/Sub035PreEdit";

import Sub04AboutLive from "./wrap/sub/sub04Schedule/Sub04AboutLive";
import Sub04Artist from "./wrap/sub/sub04Schedule/Sub04Artist";
import Sub04BuyTicket from "./wrap/sub/sub04Schedule/Sub04BuyTicket ";
import Sub04Lental from "./wrap/sub/sub04Schedule/Sub04Lental";
import Sub04Monthly from "./wrap/sub/sub04Schedule/Sub04Monthly";
import Sub05Faq from "./wrap/sub/sub05Community/Sub05Faq";
import Sub05Gall from "./wrap/sub/sub05Community/Sub05Gall";
import Sub05Ntc from "./wrap/sub/sub05Community/Sub05Ntc";

import Sub05NtcView from "./wrap/sub/sub05Community/Sub05NtcView";
import Sub05NtcAdminView from "./wrap/sub/sub05Community/Sub05NtcAdminView";
import Sub05NtcAdminEdit from "./wrap/sub/sub05Community/Sub05NtcAdminEdit";
import Sub05NtcAdmin from "./wrap/sub/sub05Community/Sub05NtcAdmin";
import Sub05NtcAdminWrite from "./wrap/sub/sub05Community/Sub05NtcAdminWrite";

import Sub05Rev from "./wrap/sub/sub05Community/Sub05Rev";
import Sub05RevWrite from "./wrap/sub/sub05Community/Sub05RevWrite";
import Sub05Sns from "./wrap/sub/sub05Community/Sub05Sns";
import Sub06Lg from "./wrap/sub/sub06Lg/Sub06Lg";
import Sub06SearchId from "./wrap/sub/sub06Lg/Sub06SearchId";
import Sub06SearchRs from "./wrap/sub/sub06Lg/Sub06SearchRs";

import Sub07AddressList from "./wrap/sub/sub07Mp/Sub07AddressList";
import Sub07DeleteAccount from "./wrap/sub/sub07Mp/Sub07DeleteAccount";
import Sub07EditProfile from "./wrap/sub/sub07Mp/Sub07EditProfile";
import Sub07Mp from "./wrap/sub/sub07Mp/Sub07Mp";
import Sub07MyOrder from "./wrap/sub/sub07Mp/Sub07MyOrder";
import Sub07MyProfile from "./wrap/sub/sub07Mp/Sub07MyProfile";

import Sub080Mm from "./wrap/sub/sub08Mm/Sub080Mm";
import Sub081MmView from "./wrap/sub/sub08Mm/Sub081MmView";
import Sub082MmEdit from "./wrap/sub/sub08Mm/Sub082MmEdit";
import Sub083MmGrade from "./wrap/sub/sub08Mm/Sub083MmGrade";
import Sub084MmSign from "./wrap/sub/sub08Mm/Sub084MmSign";

import Sub09Cart from "./wrap/sub/sub09Cart/Sub09Cart";
import Page404Component from "./wrap/Page404Component";
import { Route, Routes, useLocation } from "react-router-dom";
import "./scss/WrapComponent.scss";
import Sub10Wishlist from "./wrap/sub/sub10Wishlist/Sub10Wishlist";
import { useDispatch, useSelector } from "react-redux";
import { wishAction } from "../store/wishlist";
import { headerAction } from "../store/header";
import { cartAction } from "../store/cart";
import ConfirmModalComponent from "./wrap/ConfirmModalComponent";
export default function WrapComponent(props) {
  /**인스턴스 생성 */
  const dispatch = useDispatch();
  const location = useLocation();

  /**스테이트 불러오기 */
  const confirmIsOn = useSelector((state) => state.confirmModal.isON);

  /**로컬스토레이지 불러오기 */
  useEffect(() => {
    const localStorage_arr = [
      { key: "위시리스트", action: wishAction },
      { key: "장바구니", action: cartAction },
    ];
    try {
      localStorage_arr.forEach(({ key, action }) => {
        const data = localStorage.getItem(key);
        if (data) {
          dispatch(action(JSON.parse(data)));
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  /**페이지 추적 */
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/mainComponent") {
      dispatch(headerAction(false));
    } else {
      dispatch(headerAction(true));
    }
  }, [location]);

  return (
    <div id="wrap">
      <Routes>
        <Route path="/" element={<HeaderComponent />}>
          <Route index element={<MainComponent />} />
          {/* 서브페이지 */}
          <Route path="/mainComponent" element={<MainComponent />} />
          <Route path="/AboutUs" element={<Sub01AboutUs />} />
          <Route path="/Interior" element={<Sub01Interior />} />
          <Route path="/MyoMyo" element={<Sub01MyoMyo />} />
          <Route path="/Story" element={<Sub01Story />} />
          <Route path="/ShopDetail" element={<Sub02ShopDetail />} />
          <Route path="/Shop" element={<Sub02Shop />} />
          <Route path="/Menu" element={<Sub030Menu />} />
          <Route path="/Wine" element={<Sub031Wine />} />
          <Route path="/Drinks" element={<Sub032Drinks />} />
          <Route path="/Food" element={<Sub033Food />} />
          <Route path="/Set" element={<Sub034Set />} />
          <Route path="/Pre" element={<Sub035Pre />} />
          <Route path="/PreV/view/:id" element={<Sub035PreView />} />
          <Route path="/PreW" element={<Sub035PreWrite />} />
          <Route path="/PreE/edit/:id" element={<Sub035PreEdit />} />

          <Route path="/AboutLive" element={<Sub04AboutLive />} />
          <Route path="/Artist" element={<Sub04Artist />} />
          <Route path="/BuyTicket" element={<Sub04BuyTicket />} />
          <Route path="/Lental" element={<Sub04Lental />} />
          <Route path="/Monthly" element={<Sub04Monthly />} />

          <Route path="/Faq" element={<Sub05Faq />} />
          <Route path="/Gall" element={<Sub05Gall />} />
          <Route path="/Ntc" element={<Sub05Ntc />} />
          <Route path="/Rev" element={<Sub05Rev />} />
          <Route path="/RevWrite" element={<Sub05RevWrite />} />
          <Route path="/Sns" element={<Sub05Sns />} />

          <Route path="/NtcV/:id" element={<Sub05NtcView />} />
          <Route path="/NtcAdminV/:id" element={<Sub05NtcAdminView />} />
          <Route path="/NtcAdminE/:id" element={<Sub05NtcAdminEdit />} />
          <Route path="/NtcAdmin" element={<Sub05NtcAdmin />} />
          <Route path="/NtcAdminW" element={<Sub05NtcAdminWrite />} />

          <Route path="/Lg" element={<Sub06Lg />} />
          <Route path="/SearchId" element={<Sub06SearchId />} />
          <Route path="/SearchRs" element={<Sub06SearchRs />} />
          {/* 배송지 관리 컴포넌트 추가 */}
          <Route path="/AddressList" element={<Sub07AddressList />} />
          <Route path="/DeleteAccount" element={<Sub07DeleteAccount />} />
          <Route path="/EditProfile" element={<Sub07EditProfile />} />
          <Route path="/Mp" element={<Sub07Mp />} />
          <Route path="/MyOrder" element={<Sub07MyOrder />} />
          <Route path="/MyProfile" element={<Sub07MyProfile />} />

          <Route path="/Mm" element={<Sub080Mm />} />
          <Route path="/MmView/:id" element={<Sub081MmView />} />
          <Route path="/MmEdit/:id" element={<Sub082MmEdit />} />
          <Route path="/MmGrade" element={<Sub083MmGrade />} />
          <Route path="/MmSign" element={<Sub084MmSign />} />

          <Route path="/Cart" element={<Sub09Cart />} />
          <Route path="/Wishlist" element={<Sub10Wishlist />} />
          <Route path="/*" element={<Page404Component />} />
        </Route>
      </Routes>
      <FooterComponent />
      {confirmIsOn && <ConfirmModalComponent />}
    </div>
  );
}
