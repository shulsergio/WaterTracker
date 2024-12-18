import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice.js";
import AuthReducer from "./auth/authSlice.js";
import userReducer from "./user/userSlice.js";
import monthReducer from "./monthWaterList/monthWaterSlice";
import dayReducer from "./dayWaterList/dayWaterSlice.js";
import {
  // persistStore,
  // persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const store = configureStore({
  reducer: {
    monthWater: monthReducer,
    dayWater: dayReducer,
    user: userReducer,
    modal: modalReducer,
    auth: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;

// export const persistor = persistStore(store);
