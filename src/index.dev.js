// 用于开发环境的webpack入口
import Root from "./utils/HotApp";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./assets/style/skin.less";
import moment from "moment";
import "moment/locale/zh-cn";
import "./mock";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@s/store";

moment.locale("zh-cn");
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);
