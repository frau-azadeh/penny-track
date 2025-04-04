import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from "./featcher/userSlice";
import expenseReduser from "./featcher/expenseSlice"
const persistConfig = {
  key: "users",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedExpenseReducer = persistReducer(persistConfig, expenseReduser)

export const store = configureStore({
  reducer: {
    users: persistedUserReducer,
    expenses: persistedExpenseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
