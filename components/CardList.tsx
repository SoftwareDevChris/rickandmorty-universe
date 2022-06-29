import React, { FunctionComponent, useState, useEffect, useRef } from "react";

import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Box, CircularProgress, Container, TextField } from "@mui/material";
import { useQuery } from "react-query";

import {
  fetchCharactersByPage,
  fetchCharactersByName,
} from "../functions/FetchFromAPI";
import queryOptions from "../utility/QueryOptions";
import { InitialApiResponse } from "../utility/DataModels";

import CardItem from "../components/CardItem";

import styles from "../styles/CardList.module.css";

const CardList: FunctionComponent = () => {
  const [dataResults, setDataResults] = useState<InitialApiResponse>();
  const [currentPageNumber, setCurrentPageNumber] = useState<string>("1");
  const [searchedName, setSearchedName] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);

  // Fetching data with custom query options from the 'utility' folder
  const { data, isLoading, isFetching } = useQuery(
    [`characters`, currentPageNumber],
    () => fetchCharactersByPage(currentPageNumber),
    queryOptions
  );

  console.count("renders: ");

  // Set the initial pagenumber to whatever is in the sessionstorage.
  // If nothing is there, pageNumber will be set to 1.
  // However if there is a value in the sessionstorage, pass it to pageNumber stage
  useEffect(() => {
    const storedPageNumber = sessionStorage.getItem("selectedPage");
    if (storedPageNumber) setCurrentPageNumber(storedPageNumber);
    if (!storedPageNumber) setCurrentPageNumber("1");

    if (data) setDataResults(data);
    if (dataResults?.error) setError(true);
  }, [currentPageNumber, data, dataResults, dataResults?.error]);

  // If the data is loading, missing or no result from search
  if (isLoading || isFetching) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!data) return <div>No data could be found</div>;

  // Function to handle pageswitch and sessionstorage of the currently selected page.
  const selectPage = (selectPage: { selected: number }) => {
    sessionStorage.setItem(
      "selectedPage",
      (selectPage.selected + 1).toString()
    );
    setCurrentPageNumber((selectPage.selected + 1).toString());
  };

  const searchHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const req = await fetchCharactersByName(searchedName);
    setDataResults(await req);
    setLoading(false);
    console.log(dataResults);
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
              onChange={(e) => setSearchedName(e.target.value)}
            />
          </form>
        </Box>
      </Container>
      <div style={{ color: "white" }}></div>
      <div className={styles.cardList_container}>
        {loading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <CardItem data={dataResults?.results} />
        )}
      </div>
      <div className={styles.pagination_container}>
        <>
          {error ? (
            <div style={{ color: "white" }}>There was an error</div>
          ) : (
            <ReactPaginate
              containerClassName={styles.pagination_component}
              nextLabel={<AiOutlineArrowRight size={20} />}
              previousLabel={<AiOutlineArrowLeft size={20} />}
              forcePage={parseInt(currentPageNumber) - 1}
              pageCount={dataResults?.info.pages && dataResults?.info.pages}
              onPageChange={(select: { selected: number }) =>
                selectPage(select)
              }
              pageRangeDisplayed={2}
              renderOnZeroPageCount={undefined}
              nextClassName={styles.pagination_next}
              previousClassName={styles.pagination_prev}
            />
          )}
        </>
      </div>
    </>
  );
};

export default CardList;
