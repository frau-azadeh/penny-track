import { User } from "../featcher/userSlice";
import { RootState } from "../store";

export const selectUsers = (state: RootState): User[] => {
  if ("users" in state.users && Array.isArray(state.users.users)) {
    return state.users.users;
  }
  return [];
};
