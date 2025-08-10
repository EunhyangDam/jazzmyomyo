import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import WrapComponent from "./components/WrapComponent";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import wishlist from "./store/wishlist";
import header from "./store/header";
import cart from "./store/cart";
import confirmModal from "./store/confirmModal";
import review from "./store/review";
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
