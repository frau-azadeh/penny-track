import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from "./featcher/userSlice";
import expenseReduser from "./featcher/expenseSlice";
import productReducer from "./featcher/productSlice";
import categoryReducer from "./featcher/categorySlice";
import authReducer from "./featcher/authSlice";
import authMiddleware from "./middleware/authMiddleware";

const persistConfig = {
  key: "users",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedExpenseReducer = persistReducer(persistConfig, expenseReduser);
const persistedProductReducer = persistReducer(persistConfig, productReducer);
const persistedCategoryReducer = persistReducer(persistConfig, categoryReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
  reducer: {
    users: persistedUserReducer,
    expenses: persistedExpenseReducer,
    products: persistedProductReducer,
    category: persistedCategoryReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
