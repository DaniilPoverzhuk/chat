import React from "react";

import { Box, Grid } from "@mui/material";

import ListMessages from "./ListMessages";
import Form from "./Form";
import UserInfo from "./UserInfo";

const Track: React.FC = () => {
  return (
    <Box padding={"0"} height={"100%"}>
      <Grid
        container
        display={"flex"}
        direction={"column"}
        gap={1}
        height={"100%"}
      >
        <Grid item>
          <UserInfo />
        </Grid>
        <Grid item flexGrow={1} padding={"0 20px"}>
          <ListMessages />
        </Grid>
        <Grid item>
          <Form />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Track;
