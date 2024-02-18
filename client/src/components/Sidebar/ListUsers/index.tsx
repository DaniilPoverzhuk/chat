import React, { useEffect } from "react";
import { io } from "socket.io-client";

import styles from "./index.module.scss";

import User from "./User";

import { Box, List } from "@mui/material";

import { IUser } from "@/types";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setSelectedUser, setUsers } from "@/lib/store/slices/user";
import { setData as setDataCurrentRoom } from "@/lib/store/slices/room";

import * as RoomService from "@/service/room";
import * as UserService from "@/service/user";

const ListUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { author, selectedUser, users } = useAppSelector((store) => store.user);

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
    const socket = io(import.meta.env.VITE_BASE_SERVER_URL);

    dispatch(setSelectedUser(selectedUser));
    dispatch(setDataCurrentRoom(room));

    socket.emit("create-room", room.id);
  };

  useEffect(() => {
    (async () => {
      const response = await UserService.getAll();

      dispatch(setUsers(response.data.users));
    })();
  }, []);

  return (
    <Box className={styles.root} height={"100%"}>
      <List>
        {users.map((user) => (
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
