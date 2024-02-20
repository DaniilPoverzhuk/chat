import React from "react";

import { Box } from "@mui/material";

import Author from "./Author";
import Search from "./Search";
import ListUsers from "./ListUsers";

const Sidebar: React.FC = () => {
  return (
    <>
      <Box padding={"0 20px"} display={"flex"} flexDirection={"column"} gap={1}>
        <Author />
        <Search />
      </Box>
      <ListUsers />
    </>
  );
};

export default Sidebar;
