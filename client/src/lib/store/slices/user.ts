import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types";

interface InitialState {
  data: IUser;
}

const initialState: InitialState = {
  data: {
    id: null,
    username: "",
    email: "",
    password: "",
    avatar: "",
    createdAt: "",
    updatedAt: "",
    refreshToken: "",
    accessToken: "",
  },
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
