import * as permissionAction from "../actions/permissionAction";

import { constantRouterList } from "@s/config/router.config";

// 初始状态
const initialState = {
  routers: constantRouterList
};

export default (state = initialState, action) => {
  switch (action.type) {
    case permissionAction.UPDATEMODEL: {
      return { ...state, [action.payload.name]: action.payload.value };
    }
    default:
      return state;
  }
};
