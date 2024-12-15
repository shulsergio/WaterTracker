import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import AuthReducer from "./auth/authSlice";
// import userReducer from "../redux/auth/selectors";
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
    // user: userReducer,
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
