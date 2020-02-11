import { createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import user from "./reducers/user";
import permission from "./reducers/permission";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage
  // blacklist: ["permission"]
};

const store = createStore(
  persistReducer(
    persistConfig,
    combineReducers({
      user,
      permission
    })
  ),
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);

export default store;
