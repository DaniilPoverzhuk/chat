import React, { useMemo } from "react";

import Pagination from "@/ui/Pagination";

import PaginationItem from "../PaginationItem";
import PaginationInputFile from "../PaginationInputFile";

import { ID } from "@/types";
import { List, ListItem } from "@mui/material";

interface Icon extends ID {
  src: string;
}

interface Props {
  setAvatarByDefaultIcons: (src: string) => void;
  setAvatarByInputFile: (file: File) => void;
}

const ModalContent: React.FC<Props> = ({
  setAvatarByDefaultIcons,
  setAvatarByInputFile,
}) => {
  const icons = useMemo<Icon[]>(
    () => [
      {
        id: 0,
        src: "/images/avatars/avatar-1.svg",
      },
      {
        id: 1,
        src: "/images/avatars/avatar-2.svg",
      },
      {
        id: 2,
        src: "/images/avatars/avatar-3.svg",
      },
      {
        id: 3,
        src: "/images/avatars/avatar-4.svg",
      },
      {
        id: 4,
        src: "/images/avatars/avatar-5.svg",
      },
      {
        id: 5,
        src: "/images/avatars/avatar-6.svg",
      },
      {
        id: 6,
        src: "/images/avatars/avatar-7.svg",
      },
      {
        id: 7,
        src: "/images/avatars/avatar-8.svg",
      },
      {
        id: 8,
        src: "/images/avatars/avatar-9.svg",
      },
      {
        id: 9,
        src: "/images/avatars/avatar-10.svg",
      },
      {
        id: 10,
        src: "/images/avatars/avatar-11.svg",
      },
    ],
    []
  );
  return (
    <Pagination>
      <List sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        <ListItem>
          <PaginationInputFile onClick={setAvatarByInputFile} />
        </ListItem>
        {icons.map((icon) => (
          <ListItem key={icon.id}>
            <PaginationItem
              onClick={() => setAvatarByDefaultIcons(icon.src)}
              src={icon.src}
            />
          </ListItem>
        ))}
      </List>
    </Pagination>
  );
};

export default ModalContent;
