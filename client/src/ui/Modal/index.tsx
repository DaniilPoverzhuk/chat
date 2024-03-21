import React, { useRef } from "react";
import clsx from "clsx";
import Transition from "react-transition-group/Transition";

import { Box, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./index.module.scss";

interface Props {
  children?: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ children, isVisible, onClose }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  return (
    <Transition nodeRef={rootRef} in={isVisible} timeout={400} unmountOnExit>
      {(state) => (
        <Grid ref={rootRef} sx={{ position: "absolute", inset: "0" }}>
          <Box
            className={clsx(styles.modal, styles[state])}
            sx={{
              position: "absolute",
              inset: "0",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: "100",
            }}
            onClick={onClose}
          />
          <Box
            className={clsx(styles.modal, styles[state])}
            sx={{
              backgroundColor: "#fff",
              transform: "translate(-50%, -50%)",
            }}
            padding={2}
            position={"absolute"}
            left={"50%"}
            top={"50%"}
            minWidth={"350px"}
            zIndex={100}
            borderRadius={1}
          >
            <IconButton
              sx={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
            <Box sx={{ marginTop: "40px" }}>{children}</Box>
          </Box>
        </Grid>
      )}
    </Transition>
  );
};

export default Modal;
