// Fetch characters
const fetchCharacters = async (page: number) => {
  let charactersURL: string = `https://rickandmortyapi.com/api/character`;
  return await fetch(charactersURL + `?page=${page}`).then((e) => e.json());
};

export { fetchCharacters };
