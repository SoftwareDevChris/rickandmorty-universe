import type { NextPage } from "next";
import { useState } from "react";

import { useQuery } from "react-query";

import Header from "../components/Header";
import PageLayout from "../components/PageLayout";

const getLocations = async (page: number) => {
  let locationsURL: string = `https://rickandmortyapi.com/api/location`;
  return fetch(locationsURL + `?page=${page}`).then((e) => e.json());
};

const Locations: NextPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const queryOptions = {
    cacheTime: Infinity,
    staleTime: Infinity,
    keepPreviousData: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  };

  const { data, isLoading, isFetching } = useQuery(
    [`characters`, pageNumber],
    () => getLocations(pageNumber),
    queryOptions
  );

  console.log(data);

  if (isLoading || !data) return <div>No data!</div>;
  if (isFetching) return <div>Loading...</div>;

  console.log(data);

  function nextPage() {
    if (pageNumber === data?.info.pages) return;
    setPageNumber((page) => page + 1);
  }

  function prevPage() {
    if (pageNumber === 1) return;
    setPageNumber((page) => page - 1);
  }

  return (
    <PageLayout>
      <>
        <Header />
      </>
    </PageLayout>
  );
};

export default Locations;
