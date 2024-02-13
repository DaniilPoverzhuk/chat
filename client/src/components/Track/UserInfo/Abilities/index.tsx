import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";

import { Box, IconButton } from "@mui/material";

const Abilities: React.FC = () => {
  return (
    <Box display={"flex"}>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <IconButton>
        <MoreVertSharpIcon />
      </IconButton>
    </Box>
  );
};

export default Abilities;
