import type { NextApiRequest, NextApiResponse } from "next";

type OptionsFromAPI = {
  info: {};
  results: [];
};

let charactersURL: string = `https://rickandmortyapi.com/api/character`;

export default async function fetchCharacters(
  req: NextApiRequest,
  res: NextApiResponse,
  page = 1
) {
  const result = await fetch(charactersURL + `?page=${page}`).then((res) =>
    res.json()
  );

  if (result) {
    res.status(200);
  } else {
    res.status(500);
  }

  return res;
}
