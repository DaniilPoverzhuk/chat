import React, { useMemo } from "react";

import { ListItem, Typography } from "@mui/material";
import { useAppSelector } from "@/lib/store";
import { IMessage } from "@/types";

interface Props {
  message: IMessage;
}

const Message: React.FC<Props> = ({ message: { value, sender_id } }) => {
  const authorId = useAppSelector((store) => store.user.author.id);
  const isAuthor = useMemo(() => authorId === sender_id, [sender_id, authorId]);
  const defaultStyles = useMemo(
    () => ({
      display: "flex",
      justifyContent: "flex-end",
      padding: "10px",
      width: "auto",
      maxWidth: "250px",
    }),
    []
  );
  const styles = useMemo(
    () =>
      isAuthor
        ? {
            alignSelf: "flex-end",
            backgroundColor: "#1976D2",
            borderRadius: "10px 10px 0 10px",
            color: "#fff",
          }
        : {
            alignSelf: "flex-start",
            backgroundColor: "#fff",
            boxShadow: "0 0 4px 0 rgba(34,60,80,.2)",
            borderRadius: "10px 10px 10px 0",
          },
    [isAuthor]
  );

  return (
    <ListItem
      sx={{
        ...defaultStyles,
        ...styles,
      }}
    >
      <Typography component={"p"} width={"100%"}>
        {value}
      </Typography>
    </ListItem>
  );
};

export default Message;
