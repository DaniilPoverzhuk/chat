import { Box, Container } from "@mui/material";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Box display={"flex"} justifyContent={"center"}>
        The page was not found :(
      </Box>
    </Container>
  );
};

export default NotFound;
