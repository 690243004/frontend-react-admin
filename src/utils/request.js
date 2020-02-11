import axios from "axios";
import { notification } from "antd";
import $ from "jquery";
const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "/api"
      : "https://www.zdxhyangyan.cn/api",
  timeout: 5000,
  params: {
    // ts: Date.now()
  }
});

/* 请求拦截:
   - 为请求首部添加access-token
   -
*/

instance.interceptors.request.use(
  function(config) {
    // 发送请求前做什么事
    return config;
  },
  function(error) {
    // 请求错误时做些事
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 *
 */

instance.interceptors.response.use(
  data => {
    const { code, msg } = data.data;
    // 对响应数据做哪些事
    if (code + "" === "401") {
      // 如果页面上有notification元素，则不弹出该框
      if ($(".ant-notification-notice-description").length < 1) {
        notification.error({
          message: "提示",
          description: msg || "服务器接口错误"
        });
      }
    }
    return data.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
