import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import { useQuery } from "react-query";

import { fetchCharacters } from "../../functions/FetchFromAPI";
import queryOptions from "../../utility/QueryOptions";

import PageLayout from "../../components/PageLayout";
import CardList from "../../components/CardList";
import CardItem from "../../components/CardItem";
import { Box, CircularProgress } from "@mui/material";

const Characters: NextPage = () => {
  const [pageNumber, setPageNumber] = useState<string | null>();

  // Set the initial pagenumber to whatever is in the sessionstorage.
  // If nothing is there, pageNumber will be set to 1.
  // However if there is a value in the sessionstorage, pass it to pageNumber stage
  useEffect(() => {
    const initialPageNumber = sessionStorage.getItem("selectedPage");
    if (initialPageNumber) setPageNumber(initialPageNumber);
    if (!initialPageNumber) setPageNumber("1");
  }, [pageNumber]);

  // Fetching data with custom query options from the 'utility' folder
  const { data, isLoading, isFetching } = useQuery(
    [`characters`, pageNumber],
    () => fetchCharacters(pageNumber),
    queryOptions
  );

  // If the data is loading or missing
  if (isLoading || isFetching)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  if (!data) return <div>No data could be found</div>;

  // Function to handle pageswitch and sessionstorage of the currently selected page.
  const setPage = (page: string) => {
    sessionStorage.setItem("selectedPage", page);
    setPageNumber(page);
  };

  // console.log(data);

  return (
    <>
      <Head>
        <title>{`Rick & Morty - Characters`}</title>
        <meta
          name="description"
          content="An overview of all characters in the Rick And Morty show"
        />
        <link rel="icon" href="/rickmorty.jpg" />
      </Head>

      <PageLayout>
        <>
          <CardList
            info={data?.info}
            setPage={setPage}
            currentPage={pageNumber}
          >
            <CardItem data={data?.results} />
          </CardList>
        </>
      </PageLayout>
    </>
  );
};

export default Characters;
