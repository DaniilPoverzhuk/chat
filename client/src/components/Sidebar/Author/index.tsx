import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import { useAppSelector } from "@/lib/store";

const Author: React.FC = () => {
  const { data } = useAppSelector((store) => store.user);

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
              {data.username}
            </Typography>
            <Typography
              component={"p"}
              fontSize={"12px"}
              color={"#797979"}
              fontStyle={"italic"}
            >
              {data.email}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Author;
