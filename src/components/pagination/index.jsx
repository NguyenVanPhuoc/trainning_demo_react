import clsx from "clsx";
import styles from "./style.module.css";
import { usePagination, DOTS } from "@/hooks/usePagination";

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 2,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (paginationRange && currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    currentPage < lastPage && onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    currentPage > 1 && onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={clsx(styles["pagination-container"], { [className]: className })}>
      <li
        className={clsx(styles["pagination-item"], "hover:bg-gray-100 flex justify-center items-center", `${currentPage === 1 && "pointer-events-none"}`)}
        onClick={onPrevious}
      >
        <div className={clsx(styles.arrow, styles.left)} />
      </li>
      {paginationRange.map((pageNumber, key) => {
        if (pageNumber === DOTS) {
          return <li key={key} className={clsx(styles["pagination-item"], styles.dots)}>&#8230;</li>;
        }

        return (
          <li
            key={key}
            className={clsx(styles["pagination-item"], "hover:bg-gray-100 flex justify-center items-center", `${pageNumber === currentPage && "bg-indigo-600 text-white hover:bg-indigo-700 !cursor-default"}`)}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={clsx(styles["pagination-item"], "hover:bg-gray-100 flex justify-center items-center", `${currentPage === lastPage && "pointer-events-none"}`)}
        onClick={onNext}
      >
        <div className={clsx(styles.arrow, styles.right)} />
      </li>
    </ul>
  );
};

export default Pagination;