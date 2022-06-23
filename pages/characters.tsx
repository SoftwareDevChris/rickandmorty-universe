import type { NextPage } from "next";
import { useState } from "react";

import { useQuery } from "react-query";

import { fetchCharacters } from "../functions/FetchFromAPI";
import queryOptions from "../utility/QueryOptions";

import PageLayout from "../components/PageLayout";
import CardList from "../components/CardList";
import CardItem from "../components/CardItem";

const Characters: NextPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data, isLoading, isFetching } = useQuery(
    [`characters`, pageNumber],
    () => fetchCharacters(pageNumber),
    queryOptions
  );

  if (isLoading || !data) return <div>No data!</div>;
  if (isFetching) return <div>Loading...</div>;

  const setPage = (page: number) => {
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
