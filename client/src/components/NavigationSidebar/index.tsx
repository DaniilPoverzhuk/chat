import React, { useState } from "react";
import styles from "./index.module.scss";

import FolderIcon from "@mui/icons-material/Folder";
import MenuIcon from "@mui/icons-material/Menu";
import ForumIcon from "@mui/icons-material/Forum";
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import clsx from "clsx";

const NavigationSidebar: React.FC = () => {
  const [currentGroup, setCurrentGroup] = useState();
  const isActive = true;

  return (
    <Box borderRight={"1px solid #E0E0E0"} height={"100%"}>
      <List sx={{ display: "flex", flexDirection: "column" }}>
        <ListItem sx={{ justifyContent: "center" }}>
          <IconButton>
            <MenuIcon fontSize="large" />
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
      </List>
    </Box>
  );
};

export default NavigationSidebar;
