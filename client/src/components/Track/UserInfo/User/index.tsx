import React from "react";
import clsx from "clsx";

import styles from "./index.module.scss";

import { Box, Grid, Typography } from "@mui/material";

import { useAppSelector } from "@/lib/store";
import useFriend from "@/hooks/useFriend";

const User: React.FC = () => {
  const room = useAppSelector((store) => store.room.current);
  const { isOnline, friend } = useFriend(room.users);

  if (!friend) return null;

  return (
    <Box display={"flex"} alignItems={"center"} gap={1}>
      <Grid item display={"flex"} className={styles.image}>
        <img
          src={friend.avatar}
          style={{ width: "50px", height: "50px" }}
          alt="user-avatar"
        />
        <span
          className={clsx(styles.online, {
            [styles.active]: isOnline,
          })}
        />
      </Grid>
      <Grid item>
        <Typography component={"p"} lineHeight={1}>
          {friend.username}
        </Typography>
        <Typography component={"p"} fontSize={"12px"} color={"#797979"}>
          Last seen
        </Typography>
      </Grid>
    </Box>
  );
};

export default User;
