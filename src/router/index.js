import React from "react";

// import _PageLayout from '@c/Common/PageLayout'
// import _NotFoundPage from '@v/404'

const PageLayout = React.lazy(() => import("@c/Common/PageLayout"));
const NotFoundPage = React.lazy(() => import("@v/404"));

const router = [
  {
    path: "/index",
    name: "首页",
    component: PageLayout,
    icon: "windows",
    children: [
      {
        path: "dashBoard",
        name: "导航栏",
        component: React.lazy(() => import("@v/Home"))
      }
    ]
  },
  {
    path: "/biz",
    name: "业务组件",
    component: PageLayout,
    icon: "radar-chart",
    children: [
      {
        path: "baseForm",
        name: "基础表单",
        component: React.lazy(() => import("@v/Biz/BaseForm"))
      },
      {
        path: "baseTable",
        name: "基础列表",
        component: React.lazy(() => import("@v/Biz/BaseTable"))
      },
      {
        path: "markDownEditer",
        name: "MarkDown编辑器",
        component: React.lazy(() => import("@v/Biz/MarkDownEditer"))
      },
      {
        path: "ValidScroller",
        name: "滑动校验组件",
        component: React.lazy(() => import("@v/Biz/ValidScroller"))
      }
    ]
  },
  {
    path: "/page",
    name: "基本页",
    component: PageLayout,
    icon: "",
    children: [
      {
        path: "baseDetail",
        name: "基本详情",
        component: React.lazy(() => import("@v/Base/BaseDetail"))
      },
      {
        path: "tableList",
        name: "查询表格",
        component: React.lazy(() => import("@v/Base/TableList"))
      },
      {
        path: "standerList",
        name: "标准列表",
        component: React.lazy(() => import("@v/Base/StanderList"))
      },
      {
        path: "baseForm",
        name: "基本表单",
        component: React.lazy(() => import("@v/Base/BaseForm"))
      },
      {
        path: "stepForm",
        name: "分布表单",
        component: React.lazy(() => import("@v/Base/StepForm"))
      }
    ]
  },
  {
    path: "/user",
    name: "个人中心",
    component: PageLayout,
    children: [
      {
        path: "setting",
        name: "设置",
        component: React.lazy(() => import("@v/User"))
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    component: NotFoundPage,
    meta: {
      // hidden: true
    }
  }
];

export default router;
