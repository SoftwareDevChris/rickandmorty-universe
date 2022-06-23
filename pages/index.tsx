import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { QueryClient, dehydrate, useQuery, useQueries } from "react-query";

import styles from "../styles/Home.module.css";

import PageLayout from "../components/PageLayout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`Rick & Morty - Home`}</title>
        <meta
          name="description"
          content="An overview of the characters in the Rick And Morty show"
        />
        <link rel="icon" href="/rickmorty.jpg" />
      </Head>

      <PageLayout>
        <>
          <div className={styles.heading_container}>
            <h1 className={styles.heading}>
              <span className={styles.heading_sub_one}>Rick & Morty</span>
              <span className={styles.heading_sub_two}>Universe</span>
            </h1>
          </div>

          <div className={styles.hero_image_container}>
            <Image
              alt="Rick And Morty between rift portals"
              width={350}
              height={350}
              src={"/hero.png"}
            />
          </div>
        </>
      </PageLayout>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });

  let charactersURL: string = `https://rickandmortyapi.com/api/character`;

  const getCharacters = async () => {
    return fetch(charactersURL).then((res) => res.json());
  };

  await queryClient.fetchQuery("characters", getCharacters);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
