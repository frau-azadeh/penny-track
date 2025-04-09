import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (
      state,
      action: PayloadAction<{ name: string; email: string }>,
    ) => {
      const newUser: User = {
        id: uuidv4(),
        name: action.payload.name,
        email: action.payload.email,
      };
      state.users.push(newUser);
    },
    updateUser: (
      state,
      action: PayloadAction<{ id: string; name: string; email: string }>,
    ) => {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          name: action.payload.name,
          email: action.payload.email,
        };
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
