import { NextPage } from "next";
import Head from "next/head";

import { useEffect } from "react";

import PageLayout from "../../components/PageLayout";

const About: NextPage = () => {
  // Set the selected page back to 1 in the character pagination
  useEffect(() => {
    const storedPage = sessionStorage.getItem("storedPageNumber");
    if (storedPage !== "1") sessionStorage.setItem("storedPageNumber", "1");
  });

  return (
    <>
      <Head>
        <title>{`Rick & Morty - About`}</title>
        <meta name="description" content="About the creator of this page" />
        <link rel="icon" href="/rickmorty.jpg" />
      </Head>

      {/* @ts-ignore - Currently incompatible with React 18 */}
      <PageLayout isCentered={true}>
        <>
          <h3 style={{ fontSize: "3rem" }}>Made in NextJS</h3>
          <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
            By SoftwareDevChris
          </p>
        </>
      </PageLayout>
    </>
  );
};

export default About;
