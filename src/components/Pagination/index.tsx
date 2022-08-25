import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  setCurrentPage: any
}

export const Pagination: React.FC<PaginationProps> = ({currentPage, setCurrentPage}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => setCurrentPage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
    />
  );
};
