export const UPDATEMODEL = Symbol();

export const updateModel = payload => ({ type: UPDATEMODEL, payload });

export const updateModelAync = payload => dispatch =>
  dispatch({ type: UPDATEMODEL, payload });

import { getUserInfo } from "@s/api/auth";

const generateRouter = (data, parentId = "0") => {
  let result = [];
  data.forEach(item => {
    if (item.parentId + "" === parentId + "") {
      result.push({
        ...item,
        children: generateRouter(data, item.id)
      });
    }
  });
  return result;
};

export const getUserInfoAction = () => async (dispatch, getState) => {
  try {
    const routers = getState().permission.routers;
    const { code, data } = await getUserInfo();
    if (code + "" === "200") {
      dispatch(
        updateModel({
          name: "routers",
          value: routers.concat(generateRouter(data.menus))
        })
      );
      dispatch(updateModel({ name: "info", value: data }));
    }
  } catch (e) {
    console.log(e);
  }
};
