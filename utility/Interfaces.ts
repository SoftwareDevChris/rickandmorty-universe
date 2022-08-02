interface InitialResponseFromAPI {
  info: {
    count?: number;
    next?: string | null;
    pages: number;
    prev?: string | null;
  };
  results: [];
  error?: {
    error: string;
  };
}

interface ResultsFromAPI {
  id: number;
  name: string;
  species: string;
  status: string;
  image: string;
}

export type { ResultsFromAPI, InitialResponseFromAPI };
