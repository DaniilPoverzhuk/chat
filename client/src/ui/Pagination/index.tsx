import { ReactNode } from "react";
import { Pagination as PaginationMaterial } from "@mui/material";

import { ID } from "@/types";

interface Props {
  children?: ReactNode;
}

const Pagination = ({ children }: Props) => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const pages = useMemo(() => Math.ceil(list.length / max), [max, list]);
  // const listItemsOnCurrentPage = useMemo(
  //   () => list.slice(max * (currentPage - 1), max * currentPage),
  //   [currentPage, max]
  // );

  // const changePage = (_: ChangeEvent<unknown>, page: number) => {
  //   setCurrentPage(page);
  // };

  return (
    <>
      {children}
      <PaginationMaterial
      // count={pages}
      // page={currentPage}
      // onChange={changePage}
      />
    </>
  );
};

export default Pagination;
