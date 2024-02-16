import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types";
import LocalStorage from "@/utils/CustomLocalStorage";
import CustomLocalStorage from "@/utils/CustomLocalStorage";

interface InitialState {
  author: IUser;
  selectedUser: IUser;
  users: IUser[] | [];
}

// const defaultDataUser = {
//   id: null,
//   username: "",
//   email: "",
//   password: "",
//   avatar: "",
//   createdAt: "",
//   updatedAt: "",
//   refreshToken: "",
//   accessToken: "",
//   isOnline: false,
// };

const initialState: InitialState = {
  author: LocalStorage.get<IUser>("author"),
  selectedUser: LocalStorage.get<IUser>("selectedUser"),
  users: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthor: (state: InitialState, action: PayloadAction<IUser>) => {
      state.author = action.payload;
    },
    setSelectedUser: (state: InitialState, action: PayloadAction<IUser>) => {
      CustomLocalStorage.set(action.payload, "selectedUser");

      state.selectedUser = action.payload;
    },
    setUsers: (state: InitialState, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setAuthor, setUsers, setSelectedUser } = UserSlice.actions;

export default UserSlice.reducer;
