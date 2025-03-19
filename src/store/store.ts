import {configureStore} from "@reduxjs/toolkit"
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import useReducer from "./featcher/userSlice"


const persistConfig = {
    key: "users",
    storage,
}
const persistedUserReducer = persistReducer(persistConfig, useReducer)

export const store = configureStore({
    reducer:{
        users: persistedUserReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =  typeof store.dispatch