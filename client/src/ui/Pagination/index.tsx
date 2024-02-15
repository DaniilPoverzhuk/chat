import { CSSProperties, ChangeEvent, useMemo, useState } from "react";
import { Pagination as PaginationMaterial } from "@mui/material";

import List from "@/ui/List";
import { ID } from "@/types";

interface Props<Item> {
  list: Item[];
  max: number;
  children?: React.ReactNode;
  renderItem: (props: Item) => React.ReactNode;
  grid?: {
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    gap?: number;
  };
  paginationStyles?: CSSProperties;
}

const Pagination = <Item extends ID>({
  list,
  max,
  renderItem,
  grid,
  paginationStyles,
}: Props<Item>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pages = useMemo(() => Math.ceil(list.length / max), [max, list]);
  const listItemsOnCurrentPage = useMemo(
    () => list.slice(max * (currentPage - 1), max * currentPage),
    [currentPage, max]
  );

  const changePage = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <List grid={grid} list={listItemsOnCurrentPage} renderItem={renderItem} />
      <PaginationMaterial
        sx={paginationStyles}
        count={pages}
        page={currentPage}
        onChange={changePage}
      />
    </>
  );
};

export default Pagination;
