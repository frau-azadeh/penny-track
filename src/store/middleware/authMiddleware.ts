import { Middleware, isAnyOf } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode"; // ✅ استفاده از jwt-decode
import { logout, login } from "../featcher/authSlice";
import { toast } from "react-toastify";

const authMiddleware: Middleware = (store) => (next) => (action) => {
  // بررسی اینکه آیا اکشن مورد نظر ماست
  if (isAnyOf(login)(action)) {
    const token = action.payload;

    try {
      // دیکد کردن توکن با استفاده از jwt-decode
      const decoded = jwtDecode(token);
      console.log("Token Decoded:", decoded);
      return next(action); // ادامه پردازش اکشن پس از تایید
    } catch (error) {
      console.error("Token decoding failed:", error);
      toast.error("Invalid token, logging out.");
      store.dispatch(logout());
      return;
    }
  }

  return next(action);
};

export default authMiddleware;
