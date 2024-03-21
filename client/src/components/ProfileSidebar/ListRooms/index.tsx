import React from "react";
import styles from "./index.module.scss";

import { Box } from "@mui/material";
import List from "@/ui/List";

import Room from "./Room";

import ToasterWrapper from "@/hoc/ToasterWrapper";
import useRooms from "./hooks/useRooms";

import { setCurrentRoom } from "@/lib/store/slices/room";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { IRoom } from "@/types";

const ListRooms: React.FC = () => {
  const rooms = useRooms();
  const selectedRoom = useAppSelector((store) => store.room.current);
  const dispatch = useAppDispatch();

  const setCurrentRoomHandler = (room: IRoom) => {
    dispatch(setCurrentRoom(room));
  };

  return (
    <ToasterWrapper>
      <Box className={styles.root} width={"100%"} sx={{ flexGrow: 1 }}>
        <List
          list={rooms}
          renderItem={(room) => (
            <Room
              key={room.id}
              room={room}
              onClick={setCurrentRoomHandler}
              isSelected={room.id === selectedRoom?.id}
            />
          )}
        />
      </Box>
    </ToasterWrapper>
  );
};

export default ListRooms;
