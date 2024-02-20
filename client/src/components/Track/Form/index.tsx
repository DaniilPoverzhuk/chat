import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { InputBase, Box, Paper, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachmentSharpIcon from "@mui/icons-material/AttachmentSharp";

import { useAppSelector } from "@/lib/store";

import * as MessageService from "@/service/message";

import { socket } from "@/pages/home";
import { IMessage } from "@/types";

const formSchema = z.object({
  message: z.string().min(1),
  files: z.object({ file: z.string() }).optional(),
});

type TypeFormSchema = z.infer<typeof formSchema>;

const Form: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<TypeFormSchema>({
    resolver: zodResolver(formSchema),
  });
  const { room, user } = useAppSelector((store) => store);

  const sendMessage: SubmitHandler<TypeFormSchema> = async (data) => {
    const message = {
      value: data.message,
      senderId: user.author.id!,
      roomId: room.data?.id!,
    } as IMessage;

    socket.emit("send-message", message);

    await MessageService.save(message);

    reset();
  };

  useEffect(() => {
    if (socket.connected && socket) {
      socket.on("get-message", (message) => console.log(message));
    }
  }, [socket]);

  return (
    <Box
      onSubmit={handleSubmit(sendMessage)}
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
          {...register("message")}
          sx={{ padding: "5px 15px", width: "100%" }}
          placeholder="Search friends..."
        />
      </Paper>
      <IconButton type="submit">
        <SendIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default Form;
