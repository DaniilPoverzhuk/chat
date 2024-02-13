import React, { useMemo } from "react";

import styles from "./index.module.scss";

import User from "./User";

import { Box, List } from "@mui/material";
import { IUser } from "@/types";

const ListUsers: React.FC = () => {
  const users = useMemo<IUser[]>(
    () => [
      {
        id: 0,
        username: "Username 1",
        email: "email-1@mail.ru",
        password: "hash-password",
        isOnline: true,
        avatar: "/images/avatars/avatar-1.svg",
        createdAt: "time",
        updatedAt: "time",
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      },
      {
        id: 1,
        username: "Username 2",
        email: "email-2@mail.ru",
        password: "hash-password",
        isOnline: false,
        avatar: "/images/avatars/avatar-2.svg",
        createdAt: "time",
        updatedAt: "time",
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      },
      {
        id: 2,
        username: "Username 3",
        email: "email-3@mail.ru",
        password: "hash-password",
        isOnline: true,
        avatar: "/images/avatars/avatar-3.svg",
        createdAt: "time",
        updatedAt: "time",
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      },
      {
        id: 3,
        username: "Username 4",
        email: "email-4@mail.ru",
        password: "hash-password",
        isOnline: false,
        avatar: "/images/avatars/avatar-4.svg",
        createdAt: "time",
        updatedAt: "time",
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      },
      {
        id: 4,
        username: "Username 5",
        email: "email-5@mail.ru",
        password: "hash-password",
        isOnline: true,
        avatar: "/images/avatars/avatar-5.svg",
        createdAt: "time",
        updatedAt: "time",
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      },
    ],
    []
  );

  return (
    <Box className={styles.root} height={"100%"}>
      <List>
        {users.map((user) => (
          <User last_message="message" {...user} />
        ))}
      </List>
    </Box>
  );
};

export default ListUsers;
