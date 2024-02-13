import React from "react";
import clsx from "clsx";

import styles from "./index.module.scss";
import { Box, Grid, Typography } from "@mui/material";

interface Props {
  isOnline?: boolean;
}

const User: React.FC<Props> = ({ isOnline = true }) => {
  return (
    <Box display={"flex"} gap={1}>
      <Grid item display={"flex"} className={styles.image}>
        <img
          src="/images/avatars/avatar-1.svg"
          alt="user-avatar"
          style={{ width: "50px", height: "50px" }}
        />
        <span
          className={clsx(styles.online, {
            [styles.active]: isOnline,
          })}
        />
      </Grid>
      <Grid item marginTop={0.5}>
        <Typography component={"p"}>Username</Typography>
        <Typography component={"p"} fontSize={"12px"} color={"#797979"}>
          Last seen
        </Typography>
      </Grid>
    </Box>
  );
};

export default User;
