import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import WrapComponent from "./components/WrapComponent";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";

import wishlist from "./store/wishlist";
import header from "./store/header";
import cart from "./store/cart";
import confirmModal from "./store/confirmModal";
import review from "./store/review";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);
let store = configureStore({
  reducer: { wishlist, header, cart, confirmModal, review },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <WrapComponent />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
