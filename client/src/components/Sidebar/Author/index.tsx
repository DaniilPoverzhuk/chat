import React, { memo } from "react";
import { Box, Grid, Typography } from "@mui/material";

import CustomLocalStorage from "@/utils/CustomLocalStorage";

import { IUser } from "@/types";

const Author: React.FC = memo(() => {
  const author = CustomLocalStorage.get<IUser>("author");

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <img
            src="/images/avatars/avatar-3.svg"
            alt="avatar-author"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={9} display={"flex"} marginTop={1}>
          <Box flexDirection={"column"}>
            <Typography component={"p"} fontWeight={500}>
              {author?.username}
            </Typography>
            <Typography
              component={"p"}
              fontSize={"12px"}
              color={"#797979"}
              fontStyle={"italic"}
            >
              {author?.email}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});

export default Author;
