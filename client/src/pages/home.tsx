import React from "react";

import { useAppSelector } from "@/lib/store";

const Home: React.FC = () => {
  const { data } = useAppSelector((state) => state.user);

  return <div>Hello {data.username} !!!</div>;
};

export default Home;
