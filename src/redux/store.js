import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice.js";
import authReducer from "./auth/authSlice.js";
import userReducer from "./user/userSlice.js";
import monthReducer from "./monthWaterList/monthWaterSlice";
import dayReducer from "./dayWaterList/dayWaterSlice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistAuthConfig = {
  key: "jwt-token",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

export const store = configureStore({
  reducer: {
    monthWater: monthReducer,
    dayWater: dayReducer,
    user: userReducer,
    modal: modalReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
