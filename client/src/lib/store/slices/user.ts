import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IUser } from "@/types";

import CustomLocalStorage from "@/utils/CustomLocalStorage";

interface InitialState {
  author: IUser;
  selectedUser: IUser;
  users: IUser[] | [];
}

const initialState: InitialState = {
  author: CustomLocalStorage.get("author"),
  selectedUser: CustomLocalStorage.get("selectedUser"),
  users: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthor: (state: InitialState, action: PayloadAction<IUser>) => {
      state.author = action.payload;
    },
    setUsers: (state: InitialState, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setAuthor, setUsers } = UserSlice.actions;

export default UserSlice.reducer;
