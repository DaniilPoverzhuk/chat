import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default () => {
  const { current: socket } = useRef(
    io(import.meta.env.VITE_BASE_SERVER_URL, { autoConnect: false })
  );
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
};
