import ReactPaginate from "react-paginate";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import styles from "../styles/CardList.module.css";

type CardListProps = {
  info: {
    pages: number;
    count: number;
  };
  setPage: Function;
  currentPage?: string | null;
  children: JSX.Element;
};

const CardList = ({ info, setPage, currentPage, children }: CardListProps) => {
  // Max number of pages from the API
  const maxNumberOfPages = info.pages;

  // Handler function for whenever the user selects a new page.
  // Calls the "setPage" prop back to the characters page.
  const selectPage = (selectPage: { selected: number }) => {
    // console.log(selectPage.selected + 1);
    setPage(selectPage.selected + 1);
  };

  // console.log(typeof currentPage);

  return (
    <>
      <div className={styles.cardList_container}>{children}</div>
      <div className={styles.pagination_container}>
        <ReactPaginate
          containerClassName={styles.pagination_component}
          nextLabel={<AiOutlineArrowRight size={20} />}
          previousLabel={<AiOutlineArrowLeft size={20} />}
          forcePage={currentPage ? parseInt(currentPage) - 1 : 1}
          pageCount={maxNumberOfPages}
          onPageChange={(number) => selectPage(number)}
          pageRangeDisplayed={2}
          renderOnZeroPageCount={undefined}
          nextClassName={styles.pagination_next}
          previousClassName={styles.pagination_prev}
        />
      </div>
    </>
  );
};

export default CardList;
