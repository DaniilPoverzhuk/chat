import React, { useMemo } from "react";

import Pagination from "@/ui/Pagination";

import PaginationItem from "../PaginationItem";

import { ID } from "@/types";

interface Icon extends ID {
  src: string;
}

interface Props {
  changeAvatar: (src: string) => void;
}

const ModalContent: React.FC<Props> = ({ changeAvatar }) => {
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
        src: "/images/avatars/avatar-1.svg",
      },
      {
        id: 6,
        src: "/images/avatars/avatar-2.svg",
      },
      {
        id: 7,
        src: "/images/avatars/avatar-3.svg",
      },
      {
        id: 8,
        src: "/images/avatars/avatar-4.svg",
      },
      {
        id: 9,
        src: "/images/avatars/avatar-5.svg",
      },
      {
        id: 10,
        src: "/images/avatars/avatar-1.svg",
      },
      {
        id: 11,
        src: "/images/avatars/avatar-2.svg",
      },
      {
        id: 12,
        src: "/images/avatars/avatar-3.svg",
      },
      {
        id: 13,
        src: "/images/avatars/avatar-4.svg",
      },
      {
        id: 14,
        src: "/images/avatars/avatar-5.svg",
      },
      {
        id: 15,
        src: "/images/avatars/avatar-1.svg",
      },
      {
        id: 16,
        src: "/images/avatars/avatar-2.svg",
      },
      {
        id: 17,
        src: "/images/avatars/avatar-3.svg",
      },
      {
        id: 18,
        src: "/images/avatars/avatar-4.svg",
      },
      {
        id: 19,
        src: "/images/avatars/avatar-5.svg",
      },
    ],
    []
  );
  return (
    <Pagination
      max={8}
      list={icons}
      grid={{
        gridTemplateColumns: "repeat(4,1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: 15,
      }}
      paginationStyles={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
      renderItem={(item) => (
        <PaginationItem key={item.id} {...item} onClick={changeAvatar} />
      )}
    />
  );
};

export default ModalContent;
