import React from "react";

import HomePage from "@/components/Pages/Home";

const Home: React.FC = () => {
  // useEffect(() => {
  //   const socket = io(import.meta.env.VITE_BASE_SERVER_URL, {
  //     withCredentials: true,
  //   });
  // }, []);
  return <HomePage />;
};

export default Home;
