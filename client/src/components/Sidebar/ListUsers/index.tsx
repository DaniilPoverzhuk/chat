import React, { useCallback, useEffect } from "react";
import styles from "./index.module.scss";

import User from "./User";

import { Box, List } from "@mui/material";

import { IUser } from "@/types";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setSelectedUser, setUsers } from "@/lib/store/slices/user";
import { setData as setDataCurrentRoom } from "@/lib/store/slices/room";

import * as RoomService from "@/service/room";
import * as UserService from "@/service/user";

const ListUsers = () => {
  const dispatch = useAppDispatch();
  const { author, selectedUser, users } = useAppSelector((store) => store.user);

  const setSelectedUserHandler = async (selectedUser: IUser) => {
    const response = await RoomService.get({
      senderId: author.id!,
      getterId: selectedUser.id!,
    });
    const room = response.data.room;

    dispatch(setSelectedUser(selectedUser));
    dispatch(setDataCurrentRoom(room));
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
            onClick={() => setSelectedUserHandler(user)}
            isActive={user?.id === selectedUser?.id}
            {...user}
          />
        ))}
      </List>
    </Box>
  );
};

export default ListUsers;
