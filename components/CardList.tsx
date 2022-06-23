import ReactPaginate from "react-paginate";

import styles from "../styles/CardList.module.css";

type CardListProps = {
  info: {
    pages: number;
    count: number;
  };
  setPage: Function;
  currentPage: number;
  children: JSX.Element;
};

const CardList = ({ info, setPage, currentPage, children }: CardListProps) => {
  const maxNumberOfPages = info.pages;

  const selectPage = (selectPage: { selected: number }) => {
    console.log(selectPage.selected + 1);
    setPage(selectPage.selected + 1);
  };

  // console.log(typeof currentPage);

  return (
    <>
      <div className={styles.cardList_container}>{children}</div>
      <div className={styles.pagination_container}>
        <ReactPaginate
          containerClassName={styles.pagination_component}
          nextLabel="->"
          previousLabel="<-"
          forcePage={currentPage - 1}
          pageCount={maxNumberOfPages}
          onPageChange={(number) => selectPage(number)}
          pageRangeDisplayed={2}
          renderOnZeroPageCount={undefined}
        />
      </div>
    </>
  );
};

export default CardList;
