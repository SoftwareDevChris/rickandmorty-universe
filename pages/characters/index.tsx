import type { NextPage } from "next";
import Head from "next/head";

import PageLayout from "../../components/PageLayout";
import CardList from "../../components/CardList";

const Characters: NextPage = () => {
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
          <CardList />
        </>
      </PageLayout>
    </>
  );
};

export default Characters;
