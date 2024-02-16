import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types";
import LocalStorage from "@/utils/localStorage";

interface InitialState {
  data: IUser;
  selectedUser: IUser;
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
  data: LocalStorage.get("user"),
  selectedUser: LocalStorage.get("selectedUser"),
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthor: (state: InitialState, action: PayloadAction<IUser>) => {
      state.data = action.payload;
    },
    setSelectedUser: (state: InitialState, action: PayloadAction<IUser>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setAuthor, setSelectedUser } = UserSlice.actions;

export default UserSlice.reducer;
