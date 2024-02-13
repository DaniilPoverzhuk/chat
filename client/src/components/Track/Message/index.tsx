import React from "react";

import { Box, Typography } from "@mui/material";

interface Props {
  value: string;
  isAuthor: boolean;
}

const Message: React.FC<Props> = ({ value, isAuthor }) => {
  const getUserStyles = () => {
    if (isAuthor) {
      return {
        alignSelf: "flex-end",
        backgroundColor: "#1976D2",
        borderRadius: "10px 10px 0 10px",
        color: "#fff",
      };
    }

    return {
      alignSelf: "flex-start",
      backgroundColor: "#fff",
      boxShadow: "0 0 4px 0 rgba(34,60,80,.2)",
      borderRadius: "10px 10px 10px 0",
    };
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px",
        maxWidth: "250px",
        ...getUserStyles(),
      }}
    >
      <Typography component={"p"}>{value}</Typography>
    </Box>
  );
};

export default Message;
