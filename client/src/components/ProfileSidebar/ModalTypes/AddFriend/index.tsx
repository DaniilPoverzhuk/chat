import { useState } from "react";

import Search from "@/components/ProfileSidebar/Search";
import ListUsers from "./ListUsers";

const AddFriend = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Search onChange={setSearch} />
      <ListUsers search={search} />
    </>
  );
};

export default AddFriend;
