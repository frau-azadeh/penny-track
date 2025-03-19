import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (
      state,
      action: PayloadAction<{ name: string; email: string }>,
    ) => {
      const nweUser: User = {
        id: uuidv4(),
        name: action.payload.name,
        email: action.payload.email,
      };
      state.users.push(nweUser);
    },
    updateUser: (
      state,
      action: PayloadAction<{ id: string; name: string; email: string }>,
    ) => {
      const user = state.users.find((user) => user.id === action.payload.id);
      if (user) {
        user.name = action.payload.name;
        user.email = action.payload.email;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
