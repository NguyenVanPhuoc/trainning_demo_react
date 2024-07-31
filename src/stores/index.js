import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from "redux";
import adminAuthReducer from "./admin/authSlice";
import adminReducer from "./admin/adminSlice.js";
import departmentReducer from "./admin/departmentSlice";

const rootReducers = combineReducers({
  adminAuth: adminAuthReducer,
  admin: adminReducer,
  department: departmentReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    let middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        isSerializable: () => true,
      },
    });
    return middleware;
  }
});

export const persistore = persistStore(store);
export default store;
