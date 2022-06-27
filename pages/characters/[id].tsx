import Head from "next/head";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";

import PageLayout from "../../components/PageLayout";
import styles from "../../styles/Details.module.css";
import { useEffect, useState } from "react";

// Base API URL
let charactersURL: string = `https://rickandmortyapi.com/api/character`;

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
  const res = await fetch(charactersURL);
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
  const res = await fetch(`${charactersURL}/${id}`);
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

  useEffect(() => {
    const getLocationData = async () => {
      const getData = await fetch(char.characters.location.url);
      const res = await getData.json();
      setLocationInfo(res);
    };
    getLocationData();
  }, [char.characters.location.url]);

  console.log(locationInfo);

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

      <PageLayout>
        <div className={styles.details_container}>
          <Card sx={{ background: "#1a1a1acf", color: "#ffff" }}>
            {/* Image */}
            <CardMedia
              component="img"
              src={char.characters.image}
              alt={`An image of ${char.characters.name}`}
              // width={300}
              // height={300}
            />
            <CardContent>
              {/* Character name */}
              <Typography variant="h4" component="h5" gutterBottom>
                {char.characters.name}
              </Typography>
              {/* Section header */}
              {/* INFO - INFO - INFO */}
              <Typography
                variant="h6"
                color={`${setDynamicTextColor()}`}
                sx={{ marginTop: 2, textDecoration: "underline" }}
              >
                Information
              </Typography>
              {/* Content row */}
              {/* Gender */}
              <div className={styles.details_contentRow}>
                <Typography variant="body2" color={`${setDynamicTextColor()}`}>
                  Gender:
                </Typography>
                <Typography variant="body2" color={`${setDynamicTextColor()}`}>
                  {char.characters.gender}
                </Typography>
              </div>
              {/* Content row */}
              {/* Status */}
              <div className={styles.details_contentRow}>
                <Typography variant="body2" color={`${setDynamicTextColor()}`}>
                  Status:
                </Typography>
                <Typography
                  variant="body2"
                  color={`${setDynamicTextColor(char.characters.status)}`}
                >
                  {char.characters.status}
                </Typography>
              </div>
              {/* Content row */}
              {/* Species */}
              <div className={styles.details_contentRow}>
                <Typography variant="body2" color={`${setDynamicTextColor()}`}>
                  Species:
                </Typography>
                <Typography variant="body2" color={`${setDynamicTextColor()}`}>
                  {char.characters.species}
                </Typography>
              </div>
              {/* Content row */}
              {/* Type */}
              <div className={styles.details_contentRow}>
                <Typography variant="body2" color={`${setDynamicTextColor()}`}>
                  Type:
                </Typography>
                <Typography variant="body2" color={`${setDynamicTextColor()}`}>
                  {char.characters.type || "N/A"}
                </Typography>
              </div>
              {/* Section header */}
              {/* LOCATION - LOCATION - LOCATION */}
              <Typography
                variant="h6"
                color={`${setDynamicTextColor()}`}
                sx={{ marginTop: 2, textDecoration: "underline" }}
              >
                Location
              </Typography>
              {/* Content row */}
              {/* Name */}
              <div className={styles.details_contentRow}>
                <Typography variant="body2" color={`${setDynamicTextColor()}`}>
                  Name:
                </Typography>
                <Typography
                  variant="body2"
                  noWrap={false}
                  color={`${setDynamicTextColor()}`}
                >
                  {locationInfo?.name}
                </Typography>
              </div>
              {/* Content row */}
              {/* Dimension */}
              <div className={styles.details_contentRow}>
                <Typography variant="body2" color={`${setDynamicTextColor()}`}>
                  Dimension:
                </Typography>
                <Typography
                  variant="body2"
                  noWrap={false}
                  color={`${setDynamicTextColor()}`}
                >
                  {locationInfo?.dimension || "N/A"}
                </Typography>
              </div>
              {/* Content row */}
              {/* Type */}
              <div className={styles.details_contentRow}>
                <Typography variant="body2" color={`${setDynamicTextColor()}`}>
                  Type:
                </Typography>
                <Typography
                  variant="body2"
                  noWrap={false}
                  color={`${setDynamicTextColor()}`}
                >
                  {locationInfo?.type || "N/A"}
                </Typography>
              </div>
              {/* Content row */}
              {/* Residents */}
              <div className={styles.details_contentRow}>
                <Typography variant="body2" color={`${setDynamicTextColor()}`}>
                  Residents:
                </Typography>
                <Typography
                  variant="body2"
                  noWrap={false}
                  color={`${setDynamicTextColor()}`}
                >
                  {locationInfo?.residents.length || "N/A"}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </>
  );
};

export default Details;
