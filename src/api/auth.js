import request from "@u/request";
export const login = data => {
  return request({
    url: "/auth/login",
    method: "post",
    data
  });
};

export const getUserInfo = data => {
  return request({
    url: "/auth/userInfo",
    method: "post",
    data
  });
};
