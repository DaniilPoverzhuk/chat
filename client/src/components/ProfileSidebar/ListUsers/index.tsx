import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

import styles from "./index.module.scss";

import CustomLocalStorage from "@/utils/CustomLocalStorage";

import User from "./User";
import ButtonAddGroup from "../ButtonAdd";

import { Box, List, Typography } from "@mui/material";

import { ISocketUsers, IUser } from "@/types";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  setSelectedUser,
  setUsers,
  updateOnlineStatus,
} from "@/lib/store/slices/user";
import { IRoom, setData as setDataCurrentRoom } from "@/lib/store/slices/room";

import * as RoomService from "@/service/room";
import * as UserService from "@/service/user";
import useSocket from "@/hooks/useSocket";

interface Props {
  search: string;
}

const EMPTY_LIST_STYLES = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  color: "#BDBDBD",
  whiteSpace: "nowrap",
};

const ListUsers: React.FC<Props> = ({ search }) => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const {
    user: { author, selectedUser, users },
  } = useAppSelector((store) => store);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const setSelectedUserHandler = async (
    selectedUser: IUser,
    isSelected: boolean
  ) => {
    if (isSelected) return;

    const { data } = await RoomService.get({
      senderId: author!.id!,
      getterId: selectedUser.id!,
    });
    const room = data.room;

    dispatch(setSelectedUser(selectedUser));
    dispatch(setDataCurrentRoom(room));

    socket.emit("create-room", room.id);
  };

  const updateOnlineUsers = (users: ISocketUsers) => {
    dispatch(updateOnlineStatus(users));
  };

  useEffect(() => {
    socket.on("get-online-users", (users) => {
      updateOnlineUsers(users);
    });

    setAllUsers();
  }, [socket]);

  useEffect(() => {
    if (!author) return;

    socket.emit("add-user", author);
  }, [author, socket]);

  useEffect(() => {
    if (!users.length) return;

    setFilteredUsers(users.filter((user) => user.username.includes(search)));
  }, [search, users]);

  const setAllUsers = async () => {
    const response = await UserService.getAll();

    dispatch(setUsers(response.data.users));
  };

  const getListContent = () => {
    if (!users.length) {
      return (
        <Typography sx={EMPTY_LIST_STYLES}>Добавьте друзей! 😏</Typography>
      );
    }

    if (!filteredUsers.length) {
      return (
        <Typography sx={EMPTY_LIST_STYLES}>
          Таких пользователей нет 😥
        </Typography>
      );
    }

    return filteredUsers.map((user) => {
      return (
        <User
          key={user.id}
          onClick={(isActive) => setSelectedUserHandler(user, isActive)}
          isActive={user?.id === selectedUser?.id}
          {...user}
        />
      );
    });
  };

  return (
    <Box className={styles.root} width={"100%"} sx={{ flexGrow: 1 }}>
      <List sx={{ height: "100%", position: "relative" }}>
        {getListContent()}
      </List>
    </Box>
  );
};

export default ListUsers;
