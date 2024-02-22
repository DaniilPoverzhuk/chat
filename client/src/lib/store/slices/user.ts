import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISocketUsers, IUser } from "@/types";
import CustomLocalStorage from "@/utils/CustomLocalStorage";

interface InitialState {
  author: IUser;
  selectedUser: IUser;
  users: IUser[] | [];
}

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
      action: PayloadAction<ISocketUsers>
    ) => {
      const idsOnlineUsers = Object.keys(action.payload);

      console.log(idsOnlineUsers, "- array of id online users");

      state.users = state.users.map((user) => {
        user.isOnline = false;

        console.log(
          state.author.id === user.id
            ? `${state.author.id} - id author`
            : `${user.id} - id user`
        );

        if (idsOnlineUsers.includes(user.id?.toString()!)) {
          console.log(user.id, "- id online user");
          user.isOnline = true;
        }

        return user;
      });

      state.selectedUser.isOnline = idsOnlineUsers.includes(
        state.selectedUser.id!?.toString()
      );

      CustomLocalStorage.set(state.selectedUser, "selectedUser");
    },
  },
});

export const { setAuthor, setUsers, setSelectedUser, updateOnlineStatus } =
  UserSlice.actions;

export default UserSlice.reducer;
