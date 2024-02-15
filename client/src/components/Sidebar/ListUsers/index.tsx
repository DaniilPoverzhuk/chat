import React, { useMemo } from "react";

import styles from "./index.module.scss";

import User from "./User";

import { Box, List } from "@mui/material";
import { IUser } from "@/types";

interface Props {
  users: IUser[];
}

const ListUsers: React.FC<Props> = ({ users }) => {
  return (
    <Box className={styles.root} height={"100%"}>
      <List>
        {users.map((user) => (
          <User key={user.id} last_message="message" {...user} />
        ))}
      </List>
    </Box>
  );
};

export default ListUsers;
