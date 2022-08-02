import { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";

import { motion } from "framer-motion";
import styles from "../../styles/About.module.scss";

import PageLayout from "../../components/PageLayout";

const About: NextPage = () => {
  // Set the selected page back to 1 in the character pagination
  useEffect(() => {
    const storedPage = sessionStorage.getItem("storedPageNumber");
    if (storedPage !== "1") sessionStorage.setItem("storedPageNumber", "1");
  });

  const animateContainer = {
    show: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -200 },
  };

  return (
    <>
      <Head>
        <title>{`Rick & Morty - About`}</title>
        <meta name="description" content="About the creator of this page" />
        <link rel="icon" href="/rickmorty.jpg" />
      </Head>

      {/* @ts-ignore - Currently incompatible with React 18 */}
      <PageLayout isCentered={true}>
        <motion.div initial="hidden" animate="show" variants={animateContainer}>
          <h3 className={styles.madeIn}>Made in NextJS</h3>
          <p className={styles.madeBy}>By SoftwareDevChris</p>
        </motion.div>
      </PageLayout>
    </>
  );
};

export default About;
