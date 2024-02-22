import React, { memo } from "react";
import styles from "./index.module.scss";

import { Button } from "@mui/material";

interface Props {
  showModal: () => void;
  src: string;
}

const AvatarButton: React.FC<Props> = memo(({ showModal, src }) => {
  return (
    <Button
      className={styles.avatar}
      onClick={showModal}
      sx={{
        position: "static",
        margin: "0 auto",
        width: "100px",
        height: "100px",
        borderRadius: "100%",
        boxShadow: "0px 0px 8px 0px rgba(34, 60, 80, 0.2)",
      }}
    >
      <img src={src} width={"100%"} />
    </Button>
  );
});

export default AvatarButton;
