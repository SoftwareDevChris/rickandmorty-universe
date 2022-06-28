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

      <PageLayout>
        <>
          <h3>About</h3>
        </>
      </PageLayout>
    </>
  );
};

export default About;
