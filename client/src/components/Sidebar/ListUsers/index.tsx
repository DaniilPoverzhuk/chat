import React, { useEffect, useMemo } from "react";
import { io } from "socket.io-client";

import styles from "./index.module.scss";

import CustomLocalStorage from "@/utils/CustomLocalStorage";

import User from "./User";
import ButtonAddGroup from "./AddGroup";

import { Box, List, Typography } from "@mui/material";

import { IUser } from "@/types";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setSelectedUser, setUsers } from "@/lib/store/slices/user";
import { IRoom, setData as setDataCurrentRoom } from "@/lib/store/slices/room";

import * as RoomService from "@/service/room";
import * as UserService from "@/service/user";

const socket = io(import.meta.env.VITE_BASE_SERVER_URL);

interface Props {
  search: string;
}

const ListUsers: React.FC<Props> = ({ search }) => {
  const dispatch = useAppDispatch();
  const { author, selectedUser, users } = useAppSelector((store) => store.user);
  const filteredUsers = useMemo(
    () => users.filter((user) => user.username.includes(search)),
    [search, users.length]
  );

  const setSelectedUserHandler = async (
    selectedUser: IUser,
    isSelected: boolean
  ) => {
    if (isSelected) return;

    const { data } = await RoomService.get({
      senderId: author.id!,
      getterId: selectedUser.id!,
    });
    const room = data.room;

    dispatch(setSelectedUser(selectedUser));
    dispatch(setDataCurrentRoom(room));

    socket.emit("create-room", room.id);
  };

  useEffect(() => {
    const room = CustomLocalStorage.get<IRoom>("currentRoom");

    if (room) {
      socket.emit("create-room", room.id);
    }

    setAllUsers();
  }, []);

  const setAllUsers = async () => {
    const response = await UserService.getAll();

    dispatch(setUsers(response.data.users));
  };

  return (
    <Box className={styles.root} height={"100%"}>
      <List sx={{ height: "100%", position: "relative" }}>
        <ButtonAddGroup />
        {!Boolean(filteredUsers.length) && (
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "#BDBDBD",
              whiteSpace: "nowrap",
            }}
          >
            Таких пользователей нет 😥
          </Typography>
        )}
        {filteredUsers.map((user) => (
          <User
            key={user.id}
            last_message="message"
            onClick={(isActive) => setSelectedUserHandler(user, isActive)}
            isActive={user?.id === selectedUser?.id}
            {...user}
          />
        ))}
      </List>
    </Box>
  );
};

export default ListUsers;
