import { ID } from "@/types";
import CustomLocalStorage from "@/utils/CustomLocalStorage";
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
  data: CustomLocalStorage.get("currentRoom") ?? null,
};

const RoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setData: (state: InitialState, action: PayloadAction<IRoom>) => {
      CustomLocalStorage.set(action.payload, "currentRoom");
      state.data = action.payload;
    },
  },
});

export default RoomSlice.reducer;

export const { setData } = RoomSlice.actions;
