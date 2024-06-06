import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "../../types/userTypes";

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { fetchUsers } = userSlice.actions;

export default userSlice.reducer;
