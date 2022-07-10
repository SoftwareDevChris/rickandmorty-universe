import { NextPage } from "next";
import Head from "next/head";

import PageLayout from "../../components/PageLayout";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`Rick & Morty - About`}</title>
        <meta name="description" content="About the creator of this page" />
        <link rel="icon" href="/rickmorty.jpg" />
      </Head>

      <PageLayout isCentered={true}>
        <>
          <div>
            <h3 style={{ fontSize: "3rem" }}>Page will be added soon</h3>
          </div>
        </>
      </PageLayout>
    </>
  );
};

export default About;
