import {configureStore} from "@reduxjs/toolkit"
import  useReducer  from "./featcher/userSlice"
import  {persistReducer, persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage"


const persistConfig = {
    key: "users",
    storage,
}

const persistedUserReducer = persistReducer(persistConfig, useReducer)

export const store = configureStore({
    reducer:{
        users:persistedUserReducer,
    },
    devTools: process.env.NODE_ENV!== "production",
});

export const persist = persistStore(store);

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;