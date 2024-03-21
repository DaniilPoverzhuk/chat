import React from "react";

import { Box, Container, Grid, Typography } from "@mui/material";

import { useAppSelector } from "@/lib/store";

import Track from "@/components/Track";
import ProfileSidebar from "@/components/ProfileSidebar";
import NavigationSidebar from "@/components/NavigationSidebar";

const Home: React.FC = () => {
  const selectedRoom = useAppSelector((store) => store.room.current);

  return (
    <Container maxWidth="lg" sx={{ height: "100%" }}>
      <Box
        boxShadow={"0px 0px 8px 0px rgba(34, 60, 80, 0.2)"}
        padding={"0"}
        borderRadius={1.5}
        height={"100%"}
        minHeight={"55vh"}
      >
        <Grid minHeight={"55vh"} container>
          <Grid item xs={1}>
            <NavigationSidebar />
          </Grid>
          <Grid
            item
            xs={4}
            borderRight={"1px solid #E0E0E0"}
            padding={"20px 0"}
          >
            <Grid
              container
              display={"flex"}
              direction={"column"}
              height={"100%"}
            >
              <ProfileSidebar />
            </Grid>
          </Grid>
          <Grid item xs={7} position={"relative"}>
            {selectedRoom ? (
              <Track />
            ) : (
              <Typography
                fontStyle={"italic"}
                position={"absolute"}
                left={"50%"}
                top={"50%"}
                fontWeight={"500"}
                sx={{ transform: "translate(-50%, -50%)" }}
              >
                Выберите чат для переписки
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
