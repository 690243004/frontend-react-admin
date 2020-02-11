import { login } from "@s/api/auth";
import { getUserInfoAction } from "./permissionAction";

export const UPDATEMODEL = Symbol();
export const updateModel = payload => ({ type: UPDATEMODEL, payload });

export const updateModelAync = payload => dispatch =>
  dispatch({ type: UPDATEMODEL, payload });

export const loginAction = payload => async (dispatch, getState) => {
  try {
    const { code, data } = await login(payload);
    if (code + "" === "200") {
      // 先获取路由信息
      await dispatch(getUserInfoAction());
      // 再更新用户信息
      dispatch(
        updateModel({
          name: "user",
          value: data
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
};
