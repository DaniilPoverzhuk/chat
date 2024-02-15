import React from "react";

import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { IUser } from "@/types";

interface Props {
  users: IUser[];
}

const Search: React.FC<Props> = ({ users }) => {
  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "5px 10px",
      }}
    >
      <IconButton
        sx={{ padding: "5px", display: "flex", alignItems: "center" }}
      >
        <SearchIcon />
      </IconButton>
      <InputBase sx={{ marginLeft: "10px" }} placeholder="Search friends..." />
    </Paper>
  );
};

export default Search;
