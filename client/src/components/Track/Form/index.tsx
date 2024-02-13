import React from "react";

import { InputBase, Box, Paper, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachmentSharpIcon from "@mui/icons-material/AttachmentSharp";

const Form: React.FC = () => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "0 20px 15px 20px",
      }}
    >
      <Paper sx={{ width: "100%", marginRight: "10px", display: "flex" }}>
        <IconButton>
          <AttachmentSharpIcon sx={{ rotate: "135deg" }} color="primary" />
        </IconButton>
        <InputBase
          sx={{ padding: "5px 15px", width: "100%" }}
          placeholder="Search friends..."
        />
      </Paper>
      <IconButton>
        <SendIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default Form;
