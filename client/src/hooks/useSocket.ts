import { useAppSelector } from "@/lib/store";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default () => {
  const { current: socket } = useRef(
    io(import.meta.env.VITE_BASE_SERVER_URL, { autoConnect: false })
  );
  const { author } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (!author) return;

    socket.emit("user:connect", author.id);
    socket.connect();

    window.addEventListener("beforeunload", () => {
      socket.emit("user:disconnect", author.id);
    });

    return () => {
      socket.disconnect();
    };
  }, [author, socket]);

  return socket;
};
