export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface TVShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  homepage: string;
  production_companies: Company[];
}

export interface TVShowDetails extends Omit<TVShow, 'genre_ids'> {
  genres: Genre[];
  number_of_episodes: number;
  last_air_date: string;
  status: string;
  homepage: string;
  production_companies: Company[];
  last_episode_to_air: Episode;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  season_number: number;
}

export interface SearchResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
} 