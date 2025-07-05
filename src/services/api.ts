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