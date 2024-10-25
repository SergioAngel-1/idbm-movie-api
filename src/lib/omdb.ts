const API_KEY = "4046b94d";
const BASE_URL = "https://www.omdbapi.com";

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Plot: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Awards: string;
  imdbRating: string;
  imdbVotes: string;
  Released: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export async function searchMovies(
  query: string,
  page = 1
): Promise<SearchResponse> {
  const response = await fetch(
    `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
  );
  const data = await response.json();
  return data;
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const response = await fetch(
    `${BASE_URL}/?apikey=${API_KEY}&i=${id}&plot=full`
  );
  const data = await response.json();
  return data;
}

export async function getPopularMovies(page = 1): Promise<SearchResponse> {
  // OMDB doesn't have a popular movies endpoint, so we'll search for a common term
  const response = await fetch(
    `${BASE_URL}/?apikey=${API_KEY}&s=movie&type=movie&y=2024&page=${page}`
  );
  const data = await response.json();
  return data;
}
