import React, { useEffect } from "react";

import HomePage from "@/components/Pages/Home";
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_BASE_SERVER_URL);

const Home: React.FC = () => {
  useEffect(() => {
    socket.on("get-message", (message) => console.log(message));
  }, [socket]);
  return <HomePage />;
};

export default Home;
