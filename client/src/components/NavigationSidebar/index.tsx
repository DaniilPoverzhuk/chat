import React, { useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.scss";

import * as AuthService from "@/service/auth";

import { ROUTES } from "@/routes";

import MenuIcon from "@mui/icons-material/Menu";
import ForumIcon from "@mui/icons-material/Forum";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, IconButton, List, ListItem, Typography } from "@mui/material";

const NavigationSidebar: React.FC = () => {
  const navigate = useNavigate();
  const isActive = true;

  const logoutHandler = async () => {
    const response = await AuthService.logout();
    response;
    navigate(ROUTES.LOGIN);
  };

  return (
    <Box borderRight={"1px solid #E0E0E0"} height={"100%"}>
      <List sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <ListItem sx={{ justifyContent: "center" }}>
          <IconButton>
            <MenuIcon fontSize="large" sx={{ color: "#bebebe" }} />
          </IconButton>
        </ListItem>
        <ListItem disablePadding sx={{ justifyContent: "center" }}>
          <button
            className={clsx(styles.button, { [styles.active]: isActive })}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ForumIcon fontSize={"large"} sx={{ color: "#bebebe" }} />
            <Typography fontSize={13} color={"#bebebe"} fontWeight={500}>
              All Chats
            </Typography>
            <Box
              sx={{
                position: "absolute",
                left: "55%",
                top: "5%",
                background: "#1976d2",
                width: "20px",
                height: "20px",
                borderRadius: "100%",
              }}
            >
              <Typography
                component={"span"}
                fontSize={12}
                color={"#fff"}
                className={styles.numberMessage}
              >
                1
              </Typography>
            </Box>
          </button>
        </ListItem>
        <ListItem
          disablePadding
          sx={{ justifyContent: "center", marginTop: "auto" }}
          onClick={logoutHandler}
        >
          <IconButton>
            <LogoutIcon fontSize="large" sx={{ color: "#bebebe" }} />
          </IconButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default NavigationSidebar;
