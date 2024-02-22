import React, { useMemo } from "react";

import Pagination from "@/ui/Pagination";

import PaginationItem from "../PaginationItem";
import PaginationInputFile from "../PaginationInputFile";

import { ID } from "@/types";

interface Icon extends ID {
  src: string;
  Component: React.ElementType;
}

interface Props {
  changeAvatar: (src: string) => void;
}

const ModalContent: React.FC<Props> = ({ changeAvatar }) => {
  const icons = useMemo<Icon[]>(
    () => [
      {
        id: 13,
        src: "/images/icons/plus.svg",
        Component: PaginationInputFile,
      },
      {
        id: 0,
        src: "/images/avatars/avatar-1.svg",
        Component: PaginationItem,
      },
      {
        id: 1,
        src: "/images/avatars/avatar-2.svg",
        Component: PaginationItem,
      },
      {
        id: 2,
        src: "/images/avatars/avatar-3.svg",
        Component: PaginationItem,
      },
      {
        id: 3,
        src: "/images/avatars/avatar-4.svg",
        Component: PaginationItem,
      },
      {
        id: 4,
        src: "/images/avatars/avatar-5.svg",
        Component: PaginationItem,
      },
      {
        id: 5,
        src: "/images/avatars/avatar-6.svg",
        Component: PaginationItem,
      },
      {
        id: 6,
        src: "/images/avatars/avatar-7.svg",
        Component: PaginationItem,
      },
      {
        id: 7,
        src: "/images/avatars/avatar-8.svg",
        Component: PaginationItem,
      },
      {
        id: 8,
        src: "/images/avatars/avatar-9.svg",
        Component: PaginationItem,
      },
      {
        id: 9,
        src: "/images/avatars/avatar-10.svg",
        Component: PaginationItem,
      },
      {
        id: 10,
        src: "/images/avatars/avatar-11.svg",
        Component: PaginationItem,
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
      renderItem={({ Component, id, src }) => (
        <Component key={id} src={src} onClick={changeAvatar} />
      )}
    />
  );
};

export default ModalContent;
