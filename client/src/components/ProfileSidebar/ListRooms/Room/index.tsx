import React from "react";
import clsx from "clsx";
import styles from "./index.module.scss";

import { IRoom } from "@/types";
import { Box, ListItem, ListItemButton, Typography } from "@mui/material";

import useFriend from "../../../../hooks/useFriend";

export type TypeSetRoomData = Omit<IRoom, "id" | "users" | "isCommunity">;

interface Props {
  room: IRoom;
  isSelected: boolean;
  onClick: (room: IRoom) => void;
}

const Room: React.FC<Props> = ({ room, isSelected, onClick }) => {
  const { isOnline, friend } = useFriend(room.users);
  return (
    <ListItem onClick={() => onClick(room)}>
      <ListItemButton selected={isSelected}>
        <Box display={"flex"} alignItems={"center"} gap={3}>
          <Box position={"relative"} display={"flex"}>
            <img src={room.avatar || friend?.avatar} width={60} height={60} />
            {!room.isCommunity && (
              <span
                className={clsx(styles.indicator, {
                  [styles.active]: isOnline,
                })}
              />
            )}
          </Box>
          <Typography component={"p"}>
            {room.name || friend?.username}
          </Typography>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default Room;
