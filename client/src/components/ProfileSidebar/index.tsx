import React, { useState } from "react";

import { Box, Grid } from "@mui/material";

import Author from "./Author";
import Search from "./Search";
import ListUsers from "./ListUsers";

import debounce from "lodash.debounce";
import ButtonAdd from "./ButtonAdd";

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
      <Grid
        container
        display={"grid"}
        gridTemplateColumns={"1fr 1fr"}
        marginTop={2}
      >
        <Grid item>
          <ButtonAdd label="Добавить группу" />
        </Grid>
        <Grid item>
          <ButtonAdd label="Добавить друга" />
        </Grid>
      </Grid>
      <ListUsers search={search} />
    </>
  );
};

export default Sidebar;
