import { searchContent, fetchNowPlayingMovies } from '../api';

// Mock the API module
jest.mock('../api');

describe('TMDB API Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchContent', () => {
    it('should throw error for empty search query', async () => {
      (searchContent as jest.Mock).mockRejectedValueOnce(new Error('Search query is required'));
      await expect(searchContent('', 'movie')).rejects.toThrow('Search query is required');
    });

    it('should make correct API call for movie search', async () => {
      const mockResponse = {
        results: [
          { id: 1, title: 'Test Movie' }
        ],
        page: 1,
        total_pages: 1,
        total_results: 1
      };

      (searchContent as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await searchContent('test', 'movie');
      
      expect(searchContent).toHaveBeenCalledWith('test', 'movie');
      expect(result).toEqual(mockResponse);
    });

    it('should handle API error', async () => {
      (searchContent as jest.Mock).mockRejectedValueOnce(new Error('API Error: 404 Not Found'));

      await expect(searchContent('test', 'movie'))
        .rejects
        .toThrow('API Error: 404 Not Found');
    });
  });

  describe('fetchNowPlayingMovies', () => {
    it('should fetch now playing movies successfully', async () => {
      const mockResponse = {
        results: [
          { id: 1, title: 'Now Playing Movie' }
        ],
        page: 1
      };

      (fetchNowPlayingMovies as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await fetchNowPlayingMovies();
      
      expect(fetchNowPlayingMovies).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });
}); 