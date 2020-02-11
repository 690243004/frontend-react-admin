import React from "react";
export default {
  PageLayout: React.lazy(() => import("@c/Common/PageLayout")),
  Home: React.lazy(() => import("@v/Home")),
  BaseForm: React.lazy(() => import("@v/Biz/BaseForm")),
  BaseTable: React.lazy(() => import("@v/Biz/BaseTable")),
  MarkDownEditer: React.lazy(() => import("@v/Biz/MarkDownEditer")),
  ValidScroller: React.lazy(() => import("@v/Biz/ValidScroller")),
  BaseDetail: React.lazy(() => import("@v/Base/BaseDetail")),
  TableList: React.lazy(() => import("@v/Base/TableList")),
  StanderList: React.lazy(() => import("@v/Base/StanderList")),
  BaseForm: React.lazy(() => import("@v/Base/BaseForm")),
  StanderList: React.lazy(() => import("@v/Base/StanderList")),
  StepForm: React.lazy(() => import("@v/Base/StepForm")),
  User: React.lazy(() => import("@v/User")),
  NotFoundPage: React.lazy(() => import("@v/404"))
};
