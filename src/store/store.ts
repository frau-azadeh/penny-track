import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import useReducer from "./featcher/userSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "users",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, useReducer);

export const store = configureStore({
  reducer: {
    users: persistedUserReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
