import { NextApiRequest } from "next";
import { useQuery } from "react-query";
import PageLayout from "../../components/PageLayout";
import { fetchCharacters } from "../../functions/FetchFromAPI";

let charactersURL: string = `https://rickandmortyapi.com/api/character`;

type DataResponse = {
  results: [];
  info: {};
};

type Results = {
  id: number;
  url: string;
};

type Info = {
  info: {
    count: number;
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(charactersURL);
  const data: DataResponse = await res.json();
  const results: [] = data.results;

  const paths = results.map((char: Results) => {
    return {
      params: { id: `${char.id}` },
    };
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
};

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

const Details = ({ characters }: any) => {
  //   const { data } = useQuery("characters", fetchCharacters, {
  //     initialData: props.paths,
  //   });

  return (
    <PageLayout>
      <>
        <h3 style={{ color: "#fff" }}>{characters?.name}</h3>
        <h4 style={{ color: "#fff" }}>{characters?.species}</h4>
      </>
    </PageLayout>
  );
};

export default Details;
