import { CSSProperties } from "react";
import { Typography } from "@mui/material";

import List from "@/ui/List";
import User from "../User";
import useUsers from "../hooks/useUsers";

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "25px",
};

interface Props {
  search: string;
}

const ListUsers = ({ search }: Props) => {
  const { error, users, isSendFriendRequest, onDeleteUser } = useUsers(search);

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <List
      styles={styles}
      list={users}
      renderItem={(user) => (
        <User
          {...user}
          key={user.id}
          onDeleteUser={onDeleteUser}
          isSendFriendRequest={isSendFriendRequest(user.id)}
        />
      )}
    />
  );
};

export default ListUsers;
