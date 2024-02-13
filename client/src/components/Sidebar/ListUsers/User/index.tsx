import React from "react";
import clsx from "clsx";
import styles from "./index.module.scss";

import { ListItem, ListItemButton, Grid, Typography } from "@mui/material";
import { IUser } from "@/types";

interface Props extends IUser {
  last_message: string;
}

const User: React.FC<Props> = ({
  avatar,
  isOnline,
  username,
  last_message,
}) => {
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ padding: "12.5px 20px" }}>
        <Grid container display={"flex"} alignItems={"center"} gap={"15px"}>
          <Grid
            item
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            className={styles.image}
          >
            <img
              src={avatar!}
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
              {last_message}
            </Typography>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export default User;
