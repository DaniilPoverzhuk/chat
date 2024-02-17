import { ID } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TypeCommunity = number[];

type TypeOneToOne = { senderId: number; getterId: number };

export interface IRoom extends ID {
  users: TypeCommunity | TypeOneToOne;
}

interface InitialState {
  data: IRoom | null;
}

const initialState: InitialState = {
  data: null,
};

const RoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setData: (state: InitialState, action: PayloadAction<IRoom>) => {
      state.data = action.payload;
    },
  },
});

export default RoomSlice.reducer;

export const { setData } = RoomSlice.actions;
