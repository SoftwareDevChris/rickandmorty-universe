import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";

import { useEffect, useState } from "react";

import PageLayout from "../../components/PageLayout";

// Base API URL
let baseURL: string = `https://rickandmortyapi.com/api/character`;

// Type equal to the initial response from the API
type DataResponse = {
  results: [];
  info: {};
};

// Type equal to some properties from above "results" array
type Results = {
  id: number;
  url: string;
};

// Setting static paths for every id in the first array fetched from the API
// Passed as a params object with an id equal to every id from the API.
export const getStaticPaths = async () => {
  const res = await fetch(baseURL);
  const data: DataResponse = await res.json();
  const results: [] = data.results;

  // Mapping the response from API to params
  const paths = results.map((char: Results) => {
    return {
      params: { id: `${char.id}` },
    };
  });

  // With "fallback" set to "blocking", all id's from the API will have a route,
  // even though we're only fetching the first page.
  return {
    paths: paths,
    fallback: "blocking",
  };
};

// Getting props to use in the Details component below.
// We're taking the id from params and adding it to the API route to fetch that specific query.
// Lastly we're mapping that query to props
export async function getStaticProps(context: any) {
  const id = context.params.id;
  const res = await fetch(`${baseURL}/${id}`);
  const data: Results = await res.json();

  return {
    props: {
      characters: data,
    },
  };
}

type Character = {
  characters: {
    gender: string;
    image: string;
    name: string;
    species: string;
    status: string;
    type: string;
    episode: [];
    location: {
      name: string;
      url: string;
    };
    origin: {
      name: string;
      url: string;
    };
  };
};

type LocationInfo = {
  dimension: string;
  name: string;
  type: string;
  residents: [];
};

// Component for rendering a single item with all its details
const Details = (char: Character) => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo>();
  const router = useRouter();

  useEffect(() => {
    const getLocationData = async () => {
      const getData = await fetch(char.characters.location.url);
      const res = await getData.json();
      setLocationInfo(res);
    };
    getLocationData();
  }, [char.characters.location.url]);

  const setDynamicTextColor = (status?: string) => {
    if (status === "Dead") return "#d70101";
    if (status === "Alive") return "#008000";
    if (status === "unknown") return "#ffff00";
    return "#e6e6e6";
  };

  return (
    <>
      <Head>
        <title>{`Rick & Morty - ${char.characters.name}`}</title>
        <meta
          name="description"
          content={`A detailed description of ${char.characters.name}`}
        />
        <link rel="icon" href="/rickmorty.jpg" />
      </Head>

      {/* @ts-ignore - Currently incompatible with React 18 */}
      <PageLayout isCentered={true}>
        <div>
          <figure
            className="card"
            key={char.characters.name}
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            {/* Image */}
            <Image
              src={char.characters.image}
              alt={`An image of ${char.characters.name}`}
              height={500}
              width={500}
            />

            <div className="card_content">
              {/* Character name */}
              <h5 className="card_details_title">{char.characters.name}</h5>

              <div
                className="flex_container"
                style={{ justifyContent: "space-between" }}
              >
                <p className="" style={{ color: `${setDynamicTextColor()}` }}>
                  {char.characters.gender}
                </p>

                <p
                  className={""}
                  style={{
                    color: `${setDynamicTextColor(char.characters.status)}`,
                  }}
                >
                  {char.characters.status}
                </p>
              </div>

              <p className={""} color={`${setDynamicTextColor()}`}>
                {char.characters.species}
              </p>

              <p className={""} color={`${setDynamicTextColor()}`}>
                {char.characters.type || "Unknown"}
              </p>

              <div className="card_section_container">
                <p className={""} color={`${setDynamicTextColor()}`}>
                  {locationInfo?.name}
                </p>

                <p className={""} color={`${setDynamicTextColor()}`}>
                  {locationInfo?.dimension || "Unknown"}
                </p>

                <p className={""} color={`${setDynamicTextColor()}`}>
                  {locationInfo?.type || "Unknown"}
                </p>

                <p className={""} color={`${setDynamicTextColor()}`}>
                  {locationInfo?.residents.length || "Unknown"}
                </p>
              </div>
            </div>
            <div className="button_container">
              <button className="card_button" onClick={() => router.back()}>
                Go back
              </button>
            </div>
          </figure>
        </div>
      </PageLayout>
    </>
  );
};

export default Details;
