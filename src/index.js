import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./assets/style/skin.less";
import moment from "moment";
import "moment/locale/zh-cn";
import { App } from "./App";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@s/store";

moment.locale("zh-cn");
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);
