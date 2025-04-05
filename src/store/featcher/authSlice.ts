import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number | string;
  email: string;
  full_name: string;
  position: "admin" | "user";
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const queryUrl = `https://qjeekbsdjaphrkrveckf.supabase.co/rest/v1/login?email=eq.${encodeURIComponent(email)}&password_hash=eq.${encodeURIComponent(password)}&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZWVrYnNkamFwaHJrcnZlY2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDkwNzAsImV4cCI6MjA1NjgyNTA3MH0.5Arx3Cjy3yNfNmO_K1BPFusgRdojO5rhHRW-Tr99M7k`;

      const response = await fetch(queryUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("خطای سرور:", errorData);
        return rejectWithValue("خطا در درخواست: " + errorData);
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        console.warn("کاربری با ایمیل و پسورد واردشده یافت نشد");
        return rejectWithValue("ایمیل یا رمز عبور اشتباه است");
      }

      const user: User = {
        id: data[0].id,
        email: data[0].email,
        full_name: data[0].full_name,
        position: data[0].position,
      };

      return user;
    } catch (error) {
      console.error("خطای ورود به سیستم:", error);
      return rejectWithValue("خطای غیرمنتظره در ورود");
    }
  },
);

// اضافه کردن logout برای اکسپورت
export const logout = createAsyncThunk("auth/logout", async () => {
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload as string;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
