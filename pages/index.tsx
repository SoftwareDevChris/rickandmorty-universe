import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";

import PageLayout from "../components/PageLayout";
import fetchCharacters from "./api/fetchCharacters";

const Home: NextPage = () => {
  useEffect(() => {
    const currentPage = sessionStorage.getItem("selectedPage");
    if (currentPage) sessionStorage.setItem("selectedPage", "1");
  });

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
              loading="eager"
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

// export async function getStaticProps() {
//   const prefetchedCharacters = await fetchCharacters;
//   return { props: { prefetchedCharacters } };
// }
