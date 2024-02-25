import React, { HTMLAttributes, memo } from "react";
import { Box, Grid, ListItemButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string;
}

const ButtonAdd: React.FC<Props> = memo(({ label, onClick }) => {
  return (
    <ListItemButton onClick={onClick} sx={{ padding: "20px 0" }}>
      <Grid container display={"flex"} justifyContent={"center"} gap={1}>
        <Box width={24} height={24}>
          <AddIcon color="disabled" />
        </Box>
        <Typography component={"p"} color={"#BDBDBD"} whiteSpace={"nowrap"}>
          {label}
        </Typography>
      </Grid>
    </ListItemButton>
  );
});

export default ButtonAdd;
