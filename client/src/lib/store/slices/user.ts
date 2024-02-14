import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types";
import LocalStorage from "@/utils/localStorage";

interface InitialState {
  data: IUser;
}

const defaultDataUser = {
  id: null,
  username: "",
  email: "",
  password: "",
  avatar: "",
  createdAt: "",
  updatedAt: "",
  refreshToken: "",
  accessToken: "",
  isOnline: false,
};

const initialState: InitialState = {
  data: LocalStorage.get("user") ?? defaultDataUser,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IUser>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = UserSlice.actions;

export default UserSlice.reducer;
