import React, { useEffect, useRef } from "react";
import { Box, List } from "@mui/material";

import Message from "../Message";
import getCSSPropertyValue from "@/utils/getCSSPropertyValue";
import setCSSProperty from "@/utils/setCSSProperty";

const ListMessages: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!rootRef.current || !listRef.current) return;

    const height = getCSSPropertyValue<string>({
      dom: rootRef.current,
      property: "height",
      type: "string",
    });

    setCSSProperty({
      dom: listRef.current,
      property: "height",
      value: height,
    });
  }, [rootRef.current, listRef.current]);

  return (
    <Box ref={rootRef} sx={{ height: "100%" }}>
      <List
        ref={listRef}
        className="global-scrollbar"
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "flex-start",
          gap: "20px",
          height: "0px",
          paddingRight: "15px",
          overflowY: "auto",
        }}
      >
        <Message value="new message" isAuthor />
        <Message value="new message" isAuthor />
        <Message value="new message" isAuthor />
        <Message value="new message" isAuthor />
        <Message value="new message" isAuthor />
        <Message value="new message" isAuthor />
        <Message value="new message" isAuthor />
        <Message value="new message" isAuthor />
        <Message value="old message" isAuthor={false} />
      </List>
    </Box>
  );
};

export default ListMessages;
