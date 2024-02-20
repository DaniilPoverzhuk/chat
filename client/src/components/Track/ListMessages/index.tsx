import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Box, List } from "@mui/material";

import Message from "../Message";

import getCSSPropertyValue from "@/utils/getCSSPropertyValue";
import setCSSProperty from "@/utils/setCSSProperty";
import CustomLocalStorage from "@/utils/CustomLocalStorage";

import { useAppSelector } from "@/lib/store";

import { IMessage, IUser } from "@/types";

import * as MessageService from "@/service/message";

const ListMessages: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data: room } = useAppSelector((store) => store.room);
  const author = useMemo(() => CustomLocalStorage.get<IUser>("author"), []);

  const setPreviousMessages = async (roomId: number) => {
    const dbMessages = await MessageService.getAll(roomId);

    setMessages(dbMessages.data.messages.reverse());
  };

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BASE_SERVER_URL);

    if (!room?.id) return;

    socket.on(room!.id.toString()!, (message: IMessage) => {
      console.log(messages);
      setMessages([message, ...messages]);
    });
  }, [room, messages]);

  useEffect(() => {
    if (!room?.id) return;

    setPreviousMessages(room.id);
  }, [room!?.id]);

  useEffect(() => {
    if (!rootRef.current || !listRef.current) return;

    const height = getCSSPropertyValue<string>({
      dom: rootRef.current,
      property: "height",
      type: "string",
    });

    setCSSProperty({
      dom: listRef.current,
      property: "height",
      value: height,
    });
  }, [rootRef.current, listRef.current]);

  return (
    <Box ref={rootRef} sx={{ height: "100%" }}>
      <List
        ref={listRef}
        className="global-scrollbar"
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "flex-start",
          gap: "20px",
          height: "0px",
          paddingRight: "15px",
          overflowY: "auto",
          minHeight: "400px",
        }}
      >
        {messages.map((message, idx) => {
          console.log(message, author.id);
          return (
            <Message
              key={idx}
              value={message.value}
              isAuthor={message.senderId == author.id}
            />
          );
        })}
      </List>
    </Box>
  );
};

export default ListMessages;
