import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import * as MessageService from "@/service/message";

import { useAppSelector } from "@/lib/store";
import { IMessage } from "@/types";

import useSocket from "@/hooks/useSocket";

export default () => {
  const room = useAppSelector((store) => store.room.current);
  const socket = useSocket();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!room.id) return;

    socket.on(`message:get-${room.id}`, (message: IMessage) => {
      console.log(message, messages);
      setMessages([message, ...messages]);
    });
  }, [room, socket, messages]);

  useEffect(() => {
    if (!room.id) return;

    (async () => {
      try {
        const messages = await MessageService.getAll(room.id);

        setMessages(messages);
      } catch (err) {
        toast.error("При получении сообщений произошла ошибка");
      }
    })();
  }, [room]);

  return messages;
};
