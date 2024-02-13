import React from "react";

import User from "./User";
import { Box, Grid } from "@mui/material";
import Abilities from "./Abilities";

interface Props {
  isOnline?: boolean;
}

const UserInfo: React.FC<Props> = ({ isOnline = true }) => {
  return (
    <Box boxShadow={"0 0 4px 0 rgba(34,60,80,.2)"} display={"flex"} padding={1}>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <User isOnline={isOnline} />
        <Abilities />
      </Grid>
    </Box>
  );
};

export default UserInfo;
