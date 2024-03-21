import React, { CSSProperties, useMemo } from "react";

import Message from "../Message";
import List from "@/ui/List";

import useMessages from "./hooks/useMessages";

const ListMessages: React.FC = () => {
  const messages = useMessages();
  const styles = useMemo<CSSProperties>(
    () => ({
      overflowY: "auto",
      height: "0px",
      minHeight: "400px",
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "flex-start",
      gap: "20px",
      padding: "8px 5px",
    }),
    []
  );

  return (
    <List
      className="global-scrollbar"
      styles={styles}
      list={messages}
      renderItem={(message) => <Message key={message.id} message={message} />}
    />
  );
};

export default ListMessages;
