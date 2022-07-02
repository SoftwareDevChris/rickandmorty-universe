import React, {
  FunctionComponent,
  useState,
  useEffect,
  SyntheticEvent,
} from "react";

import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Box, CircularProgress, Container, TextField } from "@mui/material";
import { useQuery } from "react-query";

import queryOptions from "../utility/QueryOptions";
import { InitialApiResponse } from "../utility/DataModels";

import CardItem from "../components/CardItem";

import styles from "../styles/CardList.module.css";

const CardList: FunctionComponent = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState<string>("");
  const [searchedName, setSearchedName] = useState<string | null>("");

  const [dataResults, setDataResults] = useState<InitialApiResponse>({
    info: { pages: 1 },
    results: [],
  });
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string>("");

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
      return setError("No results...");
    }
  }, [data, dataResults, isLoading, currentPageNumber, error]);

  // Function to handle pageswitch and sessionstorage of the currently selected page.
  const selectPage = (selectPage: { selected: number }) => {
    sessionStorage.setItem(
      "storedPageNumber",
      (selectPage.selected + 1).toString()
    );
    setCurrentPageNumber((selectPage.selected + 1).toString());
  };

  const searchHandler = (e: SyntheticEvent) => {
    e.preventDefault();
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

  return (
    <>
      <Container
        sx={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}
      >
        <Box
          sx={{
            background: "#ffff",
            borderRadius: 1,
            width: { sm: "90%", md: "50%" },
          }}
        >
          <form onSubmit={searchHandler}>
            <TextField
              fullWidth
              size="medium"
              id="filled-basic"
              label="Search"
              variant="filled"
              onChange={(e) => userInputHandler(e.target.value)}
            />
          </form>
        </Box>
      </Container>
      {loading && (
        <Box sx={{ display: "flex", m: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <div
          style={{ color: "white", textAlign: "center", marginBottom: "1rem" }}
        >
          {error}
        </div>
      )}
      <div className={styles.cardList_container}>
        <CardItem data={dataResults?.results} />
      </div>
      {dataResults?.info !== undefined && (
        <div className={styles.pagination_container}>
          <ReactPaginate
            containerClassName={styles.pagination_component}
            nextLabel={<AiOutlineArrowRight size={20} />}
            previousLabel={<AiOutlineArrowLeft size={20} />}
            forcePage={parseInt(currentPageNumber) - 1}
            pageCount={isPageUndefined()}
            onPageChange={(select: { selected: number }) => selectPage(select)}
            pageRangeDisplayed={2}
            renderOnZeroPageCount={undefined}
            nextClassName={styles.pagination_next}
            previousClassName={styles.pagination_prev}
          />
        </div>
      )}
    </>
  );
};

export default CardList;
