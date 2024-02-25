import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./index.module.scss";

import * as MessageService from "@/service/message";

import { ListItem, ListItemButton, Grid, Typography } from "@mui/material";
import { IMessage, IUser } from "@/types";
import { useAppSelector } from "@/lib/store";
import useSocket from "@/hooks/useSocket";

interface Props extends IUser {
  onClick: (isActive: boolean) => void;
  isActive: boolean;
}

const icons = [
  "/images/avatars/avatar-1.svg",
  "/images/avatars/avatar-2.svg",
  "/images/avatars/avatar-3.svg",
  "/images/avatars/avatar-4.svg",
];

const User: React.FC<Props> = ({
  id,
  avatar,
  isOnline,
  username,
  onClick,
  isActive,
}) => {
  const [lastMessage, setLastMessage] = useState<IMessage>();
  const { author } = useAppSelector((store) => store.user);
  const socket = useSocket();

  useEffect(() => {
    (async () => {
      const response = await MessageService.getLast({
        senderId: author!.id!,
        getterId: id!,
      });

      setLastMessage(response.data.value);
    })();
  }, []);

  useEffect(() => {
    if (!lastMessage) return;

    socket.on(`get-last-message-${lastMessage.roomId}`, (message: IMessage) => {
      console.log(message);
      setLastMessage(message);
    });
  }, [socket, lastMessage]);

  return (
    <ListItem disablePadding onClick={() => onClick(isActive)}>
      <ListItemButton selected={isActive} sx={{ padding: "12.5px 20px" }}>
        <Grid container display={"flex"} alignItems={"center"} gap={"15px"}>
          <Grid
            item
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            className={styles.image}
          >
            <img
              src={
                avatar
                  ? avatar
                  : icons[
                      Math.round(Math.random() * 10 * +`0.${icons.length - 1}`)
                    ]
              }
              alt={"avatar"}
              style={{ width: "50px", height: "50px" }}
            />
            <span
              className={clsx(styles.online, {
                [styles.active]: isOnline,
              })}
            />
          </Grid>
          <Grid item xs={9.5} display={"flex"} flexDirection={"column"}>
            <Typography>{username}</Typography>
            <Typography color={"#797979"} fontSize={"14px"}>
              {lastMessage?.value}
            </Typography>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export default User;
