import { IRoom } from "@/types";
import CustomLocalStorage from "@/utils/CustomLocalStorage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  current: IRoom;
  data: IRoom[];
}

const initialState: InitialState = {
  current: CustomLocalStorage.get("currentRoom") ?? null,
  data: CustomLocalStorage.get("Rooms") ?? [],
};

const RoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setCurrentRoom: (state: InitialState, action: PayloadAction<IRoom>) => {
      CustomLocalStorage.set(action.payload, "currentRoom");
      state.current = action.payload;
    },
    setRoom: (state: InitialState, action: PayloadAction<IRoom>) => {
      console.log(`setRoom Redux ${action.payload}`);
      state.data.unshift(action.payload);
    },
    setRooms: (state: InitialState, action: PayloadAction<IRoom[]>) => {
      state.data = action.payload;
    },
  },
});

export default RoomSlice.reducer;

export const { setCurrentRoom, setRoom, setRooms } = RoomSlice.actions;
