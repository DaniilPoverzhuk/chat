import React from "react";

import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  onChange: (value: string) => void;
}

const Search: React.FC<Props> = ({ onChange }) => {
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
      <InputBase
        sx={{ marginLeft: "10px" }}
        placeholder="Search friends..."
        onChange={(event) => onChange(event.target.value)}
      />
    </Paper>
  );
};

export default Search;
