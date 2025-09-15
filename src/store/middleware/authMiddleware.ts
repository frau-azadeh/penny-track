import { toast } from "react-toastify";

import { Middleware, isAnyOf } from "@reduxjs/toolkit";

import { login, logout } from "../featcher/authSlice";
import type { AppDispatch } from "../store";

const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (isAnyOf(login.fulfilled)(action)) {
    const user = action.payload;

    try {
      if (!user || !user.id) {
        throw new Error("اطلاعات کاربر نامعتبر است.");
      }
      console.log("User authenticated:", user);
      return next(action);
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error("Invalid user data, logging out.");

      // اصلاح‌شده: استفاده از AppDispatch برای dispatch کردن اکشن AsyncThunk
      (store.dispatch as AppDispatch)(logout());
      return;
    }
  }

  return next(action);
};

export default authMiddleware;
