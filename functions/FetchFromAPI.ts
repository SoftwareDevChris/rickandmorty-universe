// Fetch characters
const fetchCharacters = async (page?: any) => {
  let charactersURL: string = `https://rickandmortyapi.com/api/character`;
  const data = await fetch(charactersURL + `?page=${page}`).then((e) =>
    e.json()
  );
  return await data;
};

export { fetchCharacters };
