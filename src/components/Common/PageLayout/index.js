import React, { Suspense, useState, useEffect } from "react";
import { Layout } from "antd";
import { Route, Switch, Redirect } from "react-router-dom";
// 导入导航栏
import Header from "./Components/Header";
// 导入侧边栏
import Sider from "./Components/Sider";
// 导入底栏
import Footer from "./Components/Footer";
// 导入面包屑
import BreadCrumnbs from "./Components/BreadCrumbs";
// 导入全局loading
import Mask from "@c/Mask";
// 导入事件车
import EventEitter from "@s/utils/EventEmitter";

import AuthRoute from "@c/Route";
// 导入store
import "@s/store";
import "./index.less";
const { Content } = Layout;

let isCollapsedCache = false;

export default props => {
  const [isCollapsed, setIsCollapsed] = useState(isCollapsedCache);
  // 注册侧边栏折叠事件
  useEffect(
    () =>
      EventEitter.register("collapse", bool => {
        setIsCollapsed(bool);
        isCollapsedCache = bool;
      }),
    []
  );
  return (
    <Layout className="page-layout">
      <Header isCollapsed={isCollapsed} />
      <Layout>
        <Sider isCollapsed={isCollapsed} />
        <Content className="content">
          <BreadCrumnbs {...props} />
          <Switch>
            {props.children.map((item, index) => (
              <AuthRoute
                exact
                key={index}
                path={props.path + "/" + item.path}
                render={() => (
                  <div className="container">
                    <Suspense fallback={<Mask />}>
                      <item.component />
                    </Suspense>
                  </div>
                )}
              ></AuthRoute>
            ))}
            <Redirect to="/404"></Redirect>
          </Switch>
          <Footer />
        </Content>
      </Layout>
    </Layout>
  );
};
