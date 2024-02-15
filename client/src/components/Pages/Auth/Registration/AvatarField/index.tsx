import React, { MouseEvent, forwardRef } from "react";
import styles from "./index.module.scss";

import PersonIcon from "@mui/icons-material/Person";
import { Box, Grid, TextField } from "@mui/material";

interface Props {
  showModal: () => void;
  avatar: string;
}

const AvatarField: React.FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ showModal, avatar, ...props }, ref) => {
    const onClickHandler = (event: MouseEvent<HTMLLabelElement>) => {
      event.preventDefault();

      showModal();
    };

    return (
      <Box display={"flex"} justifyContent={"center"} sx={{ width: "100%" }}>
        <label onClick={onClickHandler}>
          <Grid
            className={styles.avatar}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "100%",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 8px 0px rgba(34, 60, 80, 0.2)",
            }}
          >
            {avatar ? (
              <img src={avatar} alt="avatar-user" width={"100%"} />
            ) : (
              <PersonIcon fontSize="large" color="action" />
            )}
            <TextField
              {...props}
              ref={ref}
              value={avatar}
              style={{
                //  display: "none"
                minWidth: "300px",
              }}
            />
          </Grid>
        </label>
        <TextField value={avatar} />
      </Box>
    );
  }
);

export default AvatarField;
