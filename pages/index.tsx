import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.scss";

import PageLayout from "../components/PageLayout";

const Home: NextPage = () => {
  // Set the selected page back to 1 in the character pagination
  useEffect(() => {
    const storedPage = sessionStorage.getItem("storedPageNumber");
    if (storedPage !== "1") sessionStorage.setItem("storedPageNumber", "1");
  });

  return (
    <>
      <Head>
        <title>{`Rick & Morty - Home`}</title>
        <meta
          name="description"
          content="An overview of all characters in the Rick And Morty show"
        />
        <link rel="icon" href="/rickmorty.jpg" />
      </Head>

      {/* @ts-ignore - Currently incompatible with React 18 */}
      <PageLayout isCentered={true}>
        <>
          <h2 className={styles.heading}>
            <span className={styles.heading_sub_one}>Rick & Morty</span>
            <span className={styles.heading_sub_two}>Universe</span>
          </h2>

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
