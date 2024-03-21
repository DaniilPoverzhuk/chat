import { IUser } from "@/types";
import CustomLocalStorage from "@/utils/CustomLocalStorage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// type TypeNotification = "friends";

interface IData {
  friends: IUser[];
}

interface InitialState {
  data: IData;
}

const initialState: InitialState = {
  data: {
    friends: [],
  },
};

type TypeNotification = "friends";

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (
      state: InitialState,
      action: PayloadAction<{ type: TypeNotification; data: any }>
    ) => {
      const { data, type } = action.payload;

      if (Array.isArray(state.data[type])) {
        state.data[type].unshift(data);
      }
    },
    deleteNotification: (
      state: InitialState,
      action: PayloadAction<{ type: TypeNotification; id: number }>
    ) => {
      const { type, id } = action.payload;

      if (Array.isArray(state.data[type])) {
        state.data[type] = state.data[type].filter((item) => item.id !== id);
      }
    },
  },
});

export default NotificationSlice.reducer;

export const { setNotification, deleteNotification } =
  NotificationSlice.actions;
