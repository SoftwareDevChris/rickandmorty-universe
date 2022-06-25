import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { useQuery } from "react-query";

import { fetchCharacters } from "../functions/FetchFromAPI";
import queryOptions from "../utility/QueryOptions";

import PageLayout from "../components/PageLayout";
import CardList from "../components/CardList";
import CardItem from "../components/CardItem";

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
  if (isLoading) return <div>Loading data...</div>;
  if (isFetching) return <div>Fetching data...</div>;
  if (!data) return <div>No data could be found</div>;

  // Function to handle pageswitch and sessionstorage of the currently selected page.
  const setPage = (page: string) => {
    sessionStorage.setItem("selectedPage", page);
    setPageNumber(page);
  };

  // console.log(data);

  return (
    <PageLayout>
      <>
        <CardList info={data?.info} setPage={setPage} currentPage={pageNumber}>
          <CardItem data={data?.results} dataType={"characters"} />
        </CardList>
      </>
    </PageLayout>
  );
};

export default Characters;
