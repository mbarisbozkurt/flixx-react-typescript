//***API INFO starts***/

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

//***API INFO ends***/

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const fetchFromTMDB = async (endpoint: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchNowPlayingMovies = async (): Promise<MovieResponse> => {
  const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
  console.log('Fetching movies from:', url);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error:', { status: response.status, data: errorData });
      throw new Error(`API Error: ${response.status} - ${errorData.status_message || response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export type { Movie, MovieResponse }; 