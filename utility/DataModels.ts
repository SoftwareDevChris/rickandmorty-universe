interface InitialApiResponse {
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

interface DataModel {
  id: number;
  name: string;
  species: string;
  status: string;
  image: string;
}

export type { DataModel, InitialApiResponse };
