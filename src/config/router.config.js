export const constantRouterList = [
  {
    path: "/index",
    name: "首页",
    component: "PageLayout",
    icon: "windows",
    children: [
      {
        path: "dashBoard",
        name: "导航栏",
        component: "Home"
      }
    ]
  },
  {
    path: "/user",
    name: "个人中心",
    component: "PageLayout",
    children: [
      {
        path: "setting",
        name: "设置",
        component: "User"
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    component: "NotFoundPage",
    meta: {
      // hidden: true
    }
  }
];
