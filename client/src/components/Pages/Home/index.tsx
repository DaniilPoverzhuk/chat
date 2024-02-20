import React from "react";

import { Box, Container, Grid } from "@mui/material";

import Track from "@/components/Track";
import Sidebar from "@/components/Sidebar";

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ height: "100%" }}>
      <Box
        boxShadow={"0px 0px 8px 0px rgba(34, 60, 80, 0.2)"}
        padding={"0"}
        borderRadius={1.5}
        height={"100%"}
      >
        <Grid height={["100%"]} container>
          <Grid
            item
            xs={4}
            borderRight={"1px solid #E0E0E0"}
            padding={"20px 0"}
          >
            <Sidebar />
          </Grid>
          <Grid item xs={8}>
            <Track />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
