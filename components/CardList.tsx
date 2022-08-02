import React, { FC, useState, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";

import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useQuery } from "react-query";

import queryOptions from "../utility/QueryOptions";
import { InitialResponseFromAPI } from "../utility/Interfaces";

import CardItem from "../components/CardItem";

import styles from "../styles/CardList.module.scss";

const CardList: FC = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState<string>("");
  const [searchedName, setSearchedName] = useState<string | null>("");
  const [error, setError] = useState<string>("");

  const [dataResults, setDataResults] = useState<InitialResponseFromAPI>({
    info: { pages: 1 },
    results: [],
  });

  const characterURL: string = `https://rickandmortyapi.com/api/character?page=${currentPageNumber}&name=${searchedName}`;

  // Fetching data with custom query options from the 'utility' folder
  const { data, isLoading, isFetching } = useQuery(
    ["character", searchedName + currentPageNumber],
    async () => await fetch(characterURL).then((res) => res.json()),
    queryOptions
  );

  useEffect(() => {
    const storedPageNumber = sessionStorage.getItem("storedPageNumber");
    const storedCharacterSearch = sessionStorage.getItem(
      "storedCharacterSearch"
    );
    if (storedPageNumber) setCurrentPageNumber(storedPageNumber);
    if (!storedPageNumber) setCurrentPageNumber("1");
    if (storedCharacterSearch) setSearchedName(storedCharacterSearch);

    if (data) {
      setDataResults(data);
      if (error) setError("");
    }
    if (dataResults?.info === undefined) {
      return setError("Your search has no matches...");
    }
  }, [data, dataResults, isLoading, currentPageNumber, error]);

  if (isLoading || isFetching) {
    return <div style={{ display: "flex", margin: "1rem" }}>Loading...</div>;
  }

  // Function to handle pageswitch and sessionstorage of the currently selected page.
  const selectPage = (selectPage: { selected: number }) => {
    sessionStorage.setItem(
      "storedPageNumber",
      (selectPage.selected + 1).toString()
    );
    setCurrentPageNumber((selectPage.selected + 1).toString());
  };

  const userInputHandler = (input: string) => {
    setCurrentPageNumber("1");
    sessionStorage.setItem("storedPageNumber", "1");

    setSearchedName(input);
  };

  const isPageUndefined = () => {
    if (dataResults.info === undefined) return 1;
    else return dataResults.info.pages;
  };

  const animateParent = {
    show: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.5,
        when: "beforeChildren",
      },
    },
    hidden: { opacity: 0, x: -200 },
  };

  return (
    <>
      <div className={styles.search_container}>
        <input
          id={styles.search_input}
          placeholder="Search name"
          onChange={(e) => userInputHandler(e.target.value)}
        />
      </div>
      {/* Error message */}
      {error && (
        <div style={{ textAlign: "center" }}>
          <p>{error}</p>
        </div>
      )}
      {/* Container with figure items */}
      <AnimatePresence>
        <motion.div
          className={styles.cardList_container}
          initial="hidden"
          animate="show"
          variants={animateParent}
        >
          {data &&
            dataResults.results.map((card, i) => {
              return <CardItem key={i} data={card} />;
            })}
        </motion.div>
      </AnimatePresence>
      {/* Pagination */}
      {dataResults?.info !== undefined && (
        <div className={styles.pagination_container}>
          <ReactPaginate
            containerClassName={styles.pagination_component}
            nextLabel={<AiOutlineArrowRight size={20} />}
            previousLabel={<AiOutlineArrowLeft size={20} />}
            forcePage={parseInt(currentPageNumber) - 1}
            pageCount={isPageUndefined()}
            onPageChange={(select: { selected: number }) => selectPage(select)}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            renderOnZeroPageCount={undefined}
            nextClassName={styles.pagination_next}
            previousClassName={styles.pagination_prev}
            activeClassName={styles.active_page}
          />
        </div>
      )}
    </>
  );
};

export default CardList;
