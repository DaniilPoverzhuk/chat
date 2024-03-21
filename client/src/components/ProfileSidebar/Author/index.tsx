import { memo } from "react";
import { Box, Grid, Typography } from "@mui/material";

import { useAppSelector } from "@/lib/store";

const Author = memo(() => {
  const { author } = useAppSelector((store) => store.user);

  return (
    <Grid container padding="10px 0" flexWrap={"nowrap"} gap={1.5}>
      <Grid item xs={3} display={"flex"} height={"80px"}>
        <img
          src={author?.avatar!}
          alt="avatar-author"
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={9} display={"flex"} marginTop={1.5}>
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
  );
});

export default Author;
