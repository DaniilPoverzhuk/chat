import React from "react";
import clsx from "clsx";

import styles from "./index.module.scss";

import { Box, Grid, Typography } from "@mui/material";

import { useAppSelector } from "@/lib/store";

const User: React.FC = () => {
  const { selectedUser, author } = useAppSelector((store) => store.user);

  if (!selectedUser || selectedUser.id === author.id) {
    return <div />;
  }

  console.log(selectedUser);

  return (
    <Box display={"flex"} gap={1}>
      <Grid item display={"flex"} className={styles.image}>
        <img
          src={selectedUser.avatar}
          style={{ width: "50px", height: "50px" }}
          alt="user-avatar"
        />
        <span
          className={clsx(styles.online, {
            [styles.active]: selectedUser.isOnline,
          })}
        />
      </Grid>
      <Grid item marginTop={0.5}>
        <Typography component={"p"}>{selectedUser.username}</Typography>
        <Typography component={"p"} fontSize={"12px"} color={"#797979"}>
          Last seen
        </Typography>
      </Grid>
    </Box>
  );
};

export default User;
