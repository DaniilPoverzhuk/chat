import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types";
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
  author: CustomLocalStorage.get<IUser>("author"),
  selectedUser: CustomLocalStorage.get<IUser>("selectedUser"),
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
    updateOnlineStatus: (
      state: InitialState,
      action: PayloadAction<{ [id: string]: string }>
    ) => {
      const idsOnlineUsers = Object.keys(action.payload);

      state.users = state.users.map((user) => {
        user.isOnline = false;

        if (idsOnlineUsers.includes(user.id?.toString()!)) {
          user.isOnline = true;
        }

        return user;
      });
    },
  },
});

export const { setAuthor, setUsers, setSelectedUser, updateOnlineStatus } =
  UserSlice.actions;

export default UserSlice.reducer;
