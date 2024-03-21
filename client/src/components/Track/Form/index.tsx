import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { InputBase, Box, Paper, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachmentSharpIcon from "@mui/icons-material/AttachmentSharp";

import { useAppSelector } from "@/lib/store";

import * as MessageService from "@/service/message";

import { IMessage } from "@/types";
import useSocket from "@/hooks/useSocket";

const formSchema = z.object({
  message: z.string().min(1),
  files: z.object({ file: z.string() }).optional(),
});

type TypeFormSchema = z.infer<typeof formSchema>;

const Form: React.FC = () => {
  const socket = useSocket();
  const { register, handleSubmit, reset } = useForm<TypeFormSchema>({
    resolver: zodResolver(formSchema),
  });
  const room = useAppSelector((store) => store.room.current);
  const author = useAppSelector((store) => store.user.author);

  const getId = () => Date.now();

  const sendMessage: SubmitHandler<TypeFormSchema> = async (data) => {
    const message = {
      id: getId(),
      value: data.message,
      sender_id: author.id,
      room_id: room.id,
    } as IMessage;

    socket.emit("message:send", message);

    await MessageService.save(message);

    reset();
  };

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
