import React, { useMemo } from "react";

import styles from "./index.module.scss";

import User from "./User";

import { Box, List } from "@mui/material";
import { IUser } from "@/types";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setSelectedUser } from "@/lib/store/slices/user";
import LocalStorage from "@/utils/localStorage";

interface Props {
  users: IUser[];
}

const ListUsers: React.FC<Props> = ({ users }) => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector((store) => store.user);

  const setSelectedUserHandler = (user: IUser) => {
    LocalStorage.set(user, "selectedUser");
    dispatch(setSelectedUser(user));
  };
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
