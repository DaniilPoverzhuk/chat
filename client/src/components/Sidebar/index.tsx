import React, { useState } from "react";

import { Box } from "@mui/material";

import Author from "./Author";
import Search from "./Search";
import ListUsers from "./ListUsers";

import debounce from "lodash.debounce";

const Sidebar: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  const setSearchHandler = debounce((value: string) => {
    setSearch(value);
  }, 300);

  return (
    <>
      <Box padding={"0 20px"} display={"flex"} flexDirection={"column"} gap={1}>
        <Author />
        <Search onChange={setSearchHandler} />
      </Box>
      <ListUsers search={search} />
    </>
  );
};

export default Sidebar;
