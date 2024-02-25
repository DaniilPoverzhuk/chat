import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ISocketUsers, IUser } from "@/types";

import CustomLocalStorage from "@/utils/CustomLocalStorage";
import isExists from "@/utils/isExists";

interface InitialState {
  author: IUser | null;
  selectedUser: IUser | null;
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
    setSelectedUser: (state: InitialState, action: PayloadAction<IUser>) => {
      CustomLocalStorage.set(action.payload, "selectedUser");

      state.selectedUser = action.payload;
    },
    setUsers: (state: InitialState, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    updateOnlineStatus: (
      state: InitialState,
      action: PayloadAction<ISocketUsers>
    ) => {
      const onlineSocketUsers = Object.values(action.payload).filter(
        ({ user }) => state.author!.id !== user.id
      );
      const onlineUsers = onlineSocketUsers.map(({ user }) => user);

      onlineUsers.forEach((user) => {
        const isExistsUser = isExists<IUser>(state.users, user, "id");

        if (!isExistsUser) {
          (state.users as IUser[]).unshift(user);
        }
      });

      state.users = state.users.map((user) => {
        user.isOnline = false;

        const isOnlineUser = isExists<IUser>(onlineUsers, user, "id");

        if (isOnlineUser) {
          user.isOnline = true;
        }

        return user;
      });

      if (!state.selectedUser) return;

      state.selectedUser.isOnline = isExists<IUser>(
        onlineUsers,
        state.selectedUser,
        "id"
      );

      CustomLocalStorage.set(state.selectedUser, "selectedUser");
    },
  },
});

export const { setAuthor, setUsers, setSelectedUser, updateOnlineStatus } =
  UserSlice.actions;

export default UserSlice.reducer;
