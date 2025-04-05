import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// تعریف نوع دقیق برای اطلاعات موجود در JWT
interface JwtPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user";
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user";
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  role: "admin" | "user" | null;
  currentUser: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  role: null,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;

      try {
        const decoded = jwtDecode<JwtPayload>(action.payload);
        state.role = decoded.role;
        state.currentUser = {
          id: decoded.id,
          email: decoded.email,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          role: decoded.role,
        };
        console.log("User logged in:", state.currentUser);
      } catch (error) {
        console.error("Invalid token format:", error);
        state.isAuthenticated = false;
        state.token = null;
        state.role = null;
        state.currentUser = null;
      }
    },

    // ✅ اکشن loginSuccess برای استفاده در middleware
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;

      try {
        const decoded = jwtDecode<JwtPayload>(action.payload);
        state.role = decoded.role;
        state.currentUser = {
          id: decoded.id,
          email: decoded.email,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          role: decoded.role,
        };
        console.log("User logged in successfully:", state.currentUser);
      } catch (error) {
        console.error("Invalid token format:", error);
        state.isAuthenticated = false;
        state.token = null;
        state.role = null;
        state.currentUser = null;
      }
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      state.currentUser = null;
      console.log("User logged out");
    },

    setUserRole: (state, action: PayloadAction<"admin" | "user">) => {
      state.role = action.payload;
    },

    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { login, loginSuccess, logout, setUserRole, setCurrentUser } =
  authSlice.actions;
export default authSlice.reducer;
