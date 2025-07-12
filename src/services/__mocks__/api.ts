import { Movie, TVShow, SearchResponse, } from '../../types/tmdb';

export const TMDB = {
  baseUrl: 'https://api.themoviedb.org/3',
  apiKey: 'test-api-key',
  imageUrl: 'https://image.tmdb.org/t/p/',
  
  originalImage: (imgPath: string) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,

  endpoints: {
    nowPlaying: '/movie/now_playing',
    popularMovies: '/movie/popular',
    popularTVShows: '/tv/popular',
    movieDetails: (id: string) => `/movie/${id}`,
    tvDetails: (id: string) => `/tv/${id}`,
    search: (type: 'movie' | 'tv') => `/search/${type}`,
  }
};

export type MovieResponse = SearchResponse<Movie>;
export type TVShowResponse = SearchResponse<TVShow>;

export const fetchFromTMDB = jest.fn();
export const fetchNowPlayingMovies = jest.fn();
export const fetchPopularMovies = jest.fn();
export const fetchPopularTVShows = jest.fn();
export const fetchMovieDetails = jest.fn();
export const fetchTVShowDetails = jest.fn();
export const searchContent = jest.fn(); 