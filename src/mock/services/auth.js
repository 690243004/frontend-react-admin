import Mock from "mockjs2";
import { getBody, getQueryParamter, trim, builder } from "../util";

const username = "admin";
const password = "admin";

const login = options => {
  const body = getBody(options);
  console.log("mock: body", body);
  if (username !== trim(body.username) || password !== trim(body.password)) {
    return builder({}, "账户或密码错误，提示 : mock账号密码都为admin", 401);
  }
  return builder(
    {
      id: Mock.mock("@guid"),
      name: Mock.mock("@name"),
      username: "admin",
      password: "",
      status: 1,
      telephone: "10086",
      lastLoginIp: "27.154.74.117",
      lastLoginTime: 1534837621348,
      creatorId: "admin",
      createTime: 1497160610259,
      deleted: 0,
      roleId: "admin",
      lang: "zh-CN",
      token: "4291d7da9005377ec9aec4a71ea837f"
    },
    "",
    200
  );
};

const userInfo = options => {
  const info = {
    id: "4291d7da9005377ec9aec4a71ea837f",
    name: "Yangyan",
    username: "admin",
    password: "",
    avatar: "/avatar2.jpg",
    status: 1,
    telephone: "",
    lastLoginIp: "27.154.74.117",
    lastLoginTime: 1534837621348,
    creatorId: "admin",
    createTime: 1497160610259,
    merchantCode: "TLif2btpzg079h15bk",
    deleted: 0,
    roleId: "admin",
    permissions: [],
    // 平级的结构，也可以让后端返回树状的结构
    menus: [
      {
        path: "/index",
        name: "首页",
        component: "PageLayout",
        icon: "windows",
        parentId: 0,
        id: 1
      },
      {
        path: "dashBoard",
        name: "导航栏",
        component: "Home",
        path: "dashBoard",
        parentId: 1,
        id: 2
      },
      {
        path: "/biz",
        name: "业务组件",
        component: "PageLayout",
        icon: "radar-chart",
        parentId: 0,
        id: 3
      },
      {
        path: "baseForm",
        name: "基础表单",
        component: "BaseForm",
        parentId: 3,
        id: 4
      },
      {
        path: "baseTable",
        name: "基础列表",
        component: "BaseTable",
        parentId: 3,
        id: 5
      },
      {
        path: "markDownEditer",
        name: "MarkDown编辑器",
        component: "MarkDownEditer",
        parentId: 3,
        id: 6
      },
      {
        path: "validScroller",
        name: "滑动校验组件",
        component: "ValidScroller",
        parentId: 3,
        id: 7
      },
      {
        path: "/page",
        name: "基本页",
        component: "ValidScroller",
        parentId: 0,
        id: 8,
        component: "PageLayout",
        icon: ""
      },
      {
        path: "baseDetail",
        name: "基本详情",
        component: "BaseDetail",
        parentId: 8,
        id: 9,
        icon: ""
      },
      {
        path: "tableList",
        name: "查询表格",
        component: "TableList",
        parentId: 8,
        id: 10,
        icon: ""
      },
      {
        path: "standerList",
        name: "标准列表",
        component: "StanderList",
        parentId: 8,
        id: 11,
        icon: ""
      },
      {
        path: "baseForm",
        name: "基本表单",
        component: "BaseForm",
        parentId: 8,
        id: 12,
        icon: ""
      },
      {
        path: "stepForm",
        name: "分布表单",
        component: "StepForm",
        parentId: 8,
        id: 13,
        icon: ""
      }
    ]
  };
  return builder(info, "", 200);
};

Mock.mock(/\/auth\/login/, "post", login);
Mock.mock(/\/auth\/userInfo/, "post", userInfo);
