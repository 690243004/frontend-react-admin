import * as userAction from "../actions/userAction";

// 初始状态
const initialState = {
  user: null,
  info: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userAction.UPDATEMODEL: {
      return { ...state, [action.payload.name]: action.payload.value };
    }
    default:
      return state;
  }
};
