import { RootState } from "../store";
import { User } from "../featcher/userSlice";

export const selectUsers = (state: RootState): User[] => {
  if ("users" in state.users && Array.isArray(state.users.users)) {
    return state.users.users;
  }
  return [];
};
