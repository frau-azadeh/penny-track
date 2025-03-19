import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
interface User{
    id: string;
    name: string;
    email: string;
}

interface UserState{
    users: User[];

}

const initialState: UserState = {
    users: []
};

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        addUser:(state, action:PayloadAction<{name: string; email: string}>)=>{
            const nweUser: User ={
                id: uuidv4(),
                name: action.payload.name,
                email: action.payload.email,
            }
            state.users.push(nweUser);
        },
        updateUser:()=>{

        },
        deleteUser:()=>{

        }
    }
})

export const {addUser, updateUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;