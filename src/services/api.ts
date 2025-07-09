import { Movie, MovieDetails, TVShowDetails, TVShow, SearchResponse } from '../types/tmdb';

//*** API INFO starts ***/

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
if (!API_KEY) {
  throw new Error('TMDB API key is not defined in environment variables');
}

const BASE_URL = 'https://api.themoviedb.org/3';

export const TMDB = {
  baseUrl: BASE_URL,
  apiKey: API_KEY,
  imageUrl: 'https://image.tmdb.org/t/p/',
  
  // Image sizes
  originalImage: (imgPath: string) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,

  // Endpoints
  endpoints: {
    nowPlaying: '/movie/now_playing',
    popularMovies: '/movie/popular',
    popularTVShows: '/tv/popular',
    movieDetails: (id: string) => `/movie/${id}`,
    tvDetails: (id: string) => `/tv/${id}`,
    search: (type: 'movie' | 'tv') => `/search/${type}`,
  }
};

//*** API INFO ends ***/

export type MovieResponse = SearchResponse<Movie>;
export type TVShowResponse = SearchResponse<TVShow>;

export const fetchFromTMDB = async (endpoint: string, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchNowPlayingMovies = async (): Promise<MovieResponse> => {
  return fetchFromTMDB(TMDB.endpoints.nowPlaying);
};

export const fetchPopularMovies = async (): Promise<MovieResponse> => {
  const data = await fetchFromTMDB(TMDB.endpoints.popularMovies);
  return {
    ...data,
    results: data.results.slice(0, 20) // Ensure we only get 20 movies (4x5 grid)
  };
};

export const fetchPopularTVShows = async (): Promise<TVShowResponse> => {
  const data = await fetchFromTMDB(TMDB.endpoints.popularTVShows);
  return {
    ...data,
    results: data.results.slice(0, 20) // Ensure we only get 20 TV shows (4x5 grid)
  };
};

export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  return fetchFromTMDB(TMDB.endpoints.movieDetails(id));
};

export const fetchTVShowDetails = async (id: string): Promise<TVShowDetails> => {
  return fetchFromTMDB(TMDB.endpoints.tvDetails(id));
}; 