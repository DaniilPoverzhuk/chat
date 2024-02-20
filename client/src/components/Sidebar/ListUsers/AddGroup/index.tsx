import React, { memo } from "react";
import { Box, Grid, ListItem, ListItemButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ButtonAddGroup: React.FC = memo(() => {
  return (
    <ListItem>
      <ListItemButton sx={{ padding: "20px" }}>
        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1.5}
        >
          <Box display={"flex"}>
            <AddIcon color="disabled" />
          </Box>
          <Typography component={"p"} color={"#BDBDBD"}>
            Добавить новую групппу
          </Typography>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
});

export default ButtonAddGroup;
