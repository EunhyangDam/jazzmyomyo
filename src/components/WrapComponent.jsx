import React, { useEffect } from "react";

//추가
import { getIsAdmin } from "../auth.js";

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
import Sub04LentalCh from "./wrap/sub/sub04Schedule/Sub04LentalCh.jsx";

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
import Sub07MyOrderMd from "./wrap/sub/sub07Mp/Sub07MyOrderMd";
import Sub07MyOrderMenu from "./wrap/sub/sub07Mp/Sub07MyOrderMenu";
import Sub07MyOrderTk from "./wrap/sub/sub07Mp/Sub07MyOrderTk";
import Sub07MyOrderRental from "./wrap/sub/sub07Mp/Sub07MyOrderRental";

import Sub080Mm from "./wrap/sub/sub08Mm/Sub080Mm";
import Sub081MmView from "./wrap/sub/sub08Mm/Sub081MmView";
import Sub082MmEdit from "./wrap/sub/sub08Mm/Sub082MmEdit";
import Sub083MmGrade from "./wrap/sub/sub08Mm/Sub083MmGrade";
import Sub084MmSign from "./wrap/sub/sub08Mm/Sub084MmSign";
import Sub085MmLental from "./wrap/sub/sub08Mm/Sub085MmLental.jsx";
import Sub086MmTk from "./wrap/sub/sub08Mm/Sub086MmTk.jsx";

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
import Sub06SignUp from "./wrap/sub/sub06Lg/Sub06SignUp";

import ReactDaumPostcode from "./wrap/ReactDaumPostcode.jsx";
import { signInAction } from "../store/signIn.js";

export default function WrapComponent(props) {
  /**인스턴스 생성 */
  const dispatch = useDispatch();
  const location = useLocation();

  //추가 : 공통 가드/게이트
  const AdminRoute = ({ children }) => {
    if (!getIsAdmin()) return <Navigate to="/" replace />;
    return children;
  };

  const Gate = ({ adminPath, children }) => {
    if (getIsAdmin()) return <Navigate to={adminPath} replace />;
    return children;
  };

  // 주소
  const isOpen = useSelector((state) => state.daumPostcode.isOpen);

  /**스테이트 불러오기 */
  const confirmIsOn = useSelector((state) => state.confirmModal.isON);

  /**로컬스토레이지 불러오기 */
  useEffect(() => {
    const localStorage_arr = [
      { key: "위시리스트", action: wishAction },
      { key: "장바구니", action: cartAction },
      { key: "jazzmyomyo_sign_in", action: signInAction },
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
    const sessionStorage_arr = [
      { key: "jazzmyomyo_sign_in", action: signInAction },
    ];
    try {
      sessionStorage_arr.forEach(({ key, action }) => {
        const data = sessionStorage.getItem(key);
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
  }, [location, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.key]);
  const getFooterClassByPath = (path) => {
    if (path === "/" || path.startsWith("/mainComponent"))
      return "footer--main";

    // About

    if (path.startsWith("/aboutUs")) return "footer--aboutus";

    if (
      path.startsWith("/about") ||
      path.startsWith("/interior") ||
      path.startsWith("/myoMyo") ||
      path.startsWith("/story")
    )
      return "footer--about";

    // Shop
    if (path.startsWith("/shop") || path.startsWith("/shopDetail"))
      return "footer--shop";

    // Menu
    if (path.startsWith("/menu") || path.startsWith("/pre"))
      return "footer--menu-pre";

    // Wine, Drinks, Food, Set
    if (
      path.startsWith("/wine") ||
      path.startsWith("/drinks") ||
      path.startsWith("/food") ||
      path.startsWith("/set")
    )
      return "footer--menu-etc";

    // Schedule
    if (
      path.startsWith("/aboutLive") ||
      path.startsWith("/artist") ||
      path.startsWith("/buyTicket") ||
      path.startsWith("/lental") ||
      path.startsWith("/monthly")
    )
      return "footer--schedule";

    // Community
    if (
      path.startsWith("/faq") ||
      path.startsWith("/gall") ||
      path.startsWith("/ntc") ||
      path.startsWith("/rev") ||
      path.startsWith("/sns")
    )
      return "footer--community";

    // Login / My page
    if (
      path.startsWith("/lg") ||
      path.startsWith("/searchId") ||
      path.startsWith("/searchRs") ||
      path.startsWith("/addressList") ||
      path.startsWith("/deleteAccount") ||
      path.startsWith("/editProfile") ||
      path.startsWith("/mp") ||
      path.startsWith("/myOrder") ||
      path.startsWith("/myProfile")
    )
      return "footer--mypage";

    // Member Management
    if (path.startsWith("/mm")) return "footer--mm";

    // Cart / Wishlist
    if (path.startsWith("/cart") || path.startsWith("/wishlist"))
      return "footer--cart";

    return "footer--default";
  };

  const footerClass = getFooterClassByPath(location.pathname);
  return (
    <div id="wrap">
      <Routes>
        <Route path="/" element={<HeaderComponent />}>
          <Route index element={<MainComponent />} />
          {/* 서브페이지 */}
          <Route path="/mainComponent" element={<MainComponent />} />
          <Route path="/aboutUs" element={<Sub01AboutUs />} />
          <Route path="/interior" element={<Sub01Interior />} />
          <Route path="/myoMyo" element={<Sub01MyoMyo />} />
          <Route path="/story" element={<Sub01Story />} />
          <Route path="/shopDetail" element={<Sub02ShopDetail />} />
          <Route path="/shop" element={<Sub02Shop />} />
          <Route path="/menu" element={<Sub030Menu />} />
          <Route path="/wine" element={<Sub031Wine />} />
          <Route path="/drinks" element={<Sub032Drinks />} />
          <Route path="/food" element={<Sub033Food />} />
          <Route path="/set" element={<Sub034Set />} />

          <Route
            path="/pre"
            element={
              <Gate adminPath="/preAdmin">
                <Sub035Pre />
              </Gate>
            }
          />

          <Route path="/preV/view/:id" element={<Sub035PreView />} />
          <Route path="/preW" element={<Sub035PreWrite />} />
          <Route path="/preE/edit/:id" element={<Sub035PreEdit />} />

          <Route
            path="/preAdmin"
            element={
              <AdminRoute>
                <Sub035PreAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/preAdminW"
            element={
              <AdminRoute>
                <Sub035PreAdminWrite />
              </AdminRoute>
            }
          />
          <Route
            path="/preAdminV/view/:id"
            element={
              <AdminRoute>
                <Sub035PreAdminView />
              </AdminRoute>
            }
          />
          <Route
            path="/preAdminE/edit/:id"
            element={
              <AdminRoute>
                <Sub035PreAdminEdit />
              </AdminRoute>
            }
          />

          <Route path="/aboutLive" element={<Sub04AboutLive />} />
          <Route path="/artist" element={<Sub04Artist />} />
          <Route path="/buyTicket" element={<Sub04BuyTicket />} />
          <Route path="/lental" element={<Sub04Lental />} />
          <Route path="/monthly" element={<Sub04Monthly />} />

          <Route path="/faq" element={<Sub05Faq />} />
          <Route path="/gall" element={<Sub05Gall />} />

          <Route
            path="/ntc"
            element={
              <Gate adminPath="/ntcAdmin">
                <Sub05Ntc />
              </Gate>
            }
          />

          <Route path="/rev" element={<Sub05Rev />} />
          <Route path="/revWrite" element={<Sub05RevWrite />} />
          <Route path="/sns" element={<Sub05Sns />} />

          <Route path="/ntcV/:id" element={<Sub05NtcView />} />
          <Route
            path="/ntcAdminV/:id"
            element={
              <AdminRoute>
                <Sub05NtcAdminView />
              </AdminRoute>
            }
          />
          <Route
            path="/ntcAdminE/:id"
            element={
              <AdminRoute>
                <Sub05NtcAdminEdit />
              </AdminRoute>
            }
          />
          <Route
            path="/ntcAdmin"
            element={
              <AdminRoute>
                <Sub05NtcAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/ntcAdminW"
            element={
              <AdminRoute>
                <Sub05NtcAdminWrite />
              </AdminRoute>
            }
          />

          <Route path="/lg" element={<Sub06Lg />} />
          <Route path="/searchId" element={<Sub06SearchId />} />
          <Route path="/searchRs" element={<Sub06SearchRs />} />
          <Route path="/signUp" element={<Sub06SignUp />} />
          <Route path="/lentalCh" element={<Sub04LentalCh />} />

          {/* 배송지 관리 컴포넌트 추가 */}
          <Route path="/addressList" element={<Sub07AddressList />} />
          <Route path="/deleteAccount" element={<Sub07DeleteAccount />} />
          <Route path="/editProfile" element={<Sub07EditProfile />} />
          <Route path="/mp" element={<Sub07Mp />} />
          <Route path="/myOrder" element={<Sub07MyOrder />} />
          <Route path="/myProfile" element={<Sub07MyProfile />} />
          <Route path="/myOrderMd" element={<Sub07MyOrderMd />} />
          <Route path="/myOrderMenu" element={<Sub07MyOrderMenu />} />
          <Route path="/myOrderTk" element={<Sub07MyOrderTk />} />
          <Route path="/myOrderRental" element={<Sub07MyOrderRental />} />

          <Route
            path="/mm"
            element={
              <AdminRoute>
                <Sub080Mm />
              </AdminRoute>
            }
          />
          <Route
            path="/mmView/:id"
            element={
              <AdminRoute>
                <Sub081MmView />
              </AdminRoute>
            }
          />
          <Route
            path="/mmEdit/:id"
            element={
              <AdminRoute>
                <Sub082MmEdit />
              </AdminRoute>
            }
          />
          <Route
            path="/mmGrade"
            element={
              <AdminRoute>
                <Sub083MmGrade />
              </AdminRoute>
            }
          />
          <Route
            path="/mmSign"
            element={
              <AdminRoute>
                <Sub084MmSign />
              </AdminRoute>
            }
          />

          <Route path="/cart" element={<Sub09Cart />} />
          <Route path="/wishlist" element={<Sub10Wishlist />} />
          <Route path="/*" element={<Page404Component />} />
        </Route>
      </Routes>

      <FooterComponent footerClass={footerClass} isAdmin={getIsAdmin()} />

      {confirmIsOn && <ConfirmModalComponent />}

      {/* 카카오주속검색 API */}
      {isOpen && <ReactDaumPostcode />}
    </div>
  );
}
