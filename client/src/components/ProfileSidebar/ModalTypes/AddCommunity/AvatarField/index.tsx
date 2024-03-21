import { Ref, forwardRef } from "react";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Box } from "@mui/material";
import { ChangeHandler, RefCallBack } from "react-hook-form";

const AvatarField = forwardRef<HTMLInputElement, null>((register, ref) => {
  return (
    <Box
      component={"label"}
      width={"75px"}
      height={"75px"}
      borderRadius={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ background: "rgba(190, 190, 190, .75)" }}
    >
      <input type="file" {...register} style={{ display: "none" }} />
      <CameraAltIcon fontSize="large" sx={{ color: "#fff" }} />
    </Box>
  );
});

export default AvatarField;
