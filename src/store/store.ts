import {configureStore} from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import {persistReducer, persistStore} from "redux-persist"

const persistConfig = {
    key: "users",
    storage,
}

const persistedUserReducer = persistReducer(persistConfig, useReducer)

export const store = configureStore({
    reducer:{
        users: persistedUserReducer,
    },
    devTools: process.env.NODE_ENV !== "production"
})

export const persistor = persistStore(store)

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch