let charactersURL: string = `https://rickandmortyapi.com/api/character`;

// Fetch characters by page
const fetchCharactersByPage = async (page?: string | null) => {
  const data = await fetch(charactersURL + `?page=${page}`).then((e) =>
    e.json()
  );
  return await data;
};

// Fetch characters by name
const fetchCharactersByName = async (name?: string | null) => {
  const data = await fetch(charactersURL + `?name=${name}`).then((e) =>
    e.json()
  );
  return await data;
};

export { fetchCharactersByPage, fetchCharactersByName };
