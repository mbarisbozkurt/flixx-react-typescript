import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchContent } from '../services/api';
import type { Movie, TVShow } from '../types/tmdb';
import LoadingSpinner from './LoadingSpinner';

const SearchSection = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<'movie' | 'tv'>('movie');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  // Debounce search term
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    const newTimeoutId = window.setTimeout(() => {
      setDebouncedTerm(value);
    }, 500);
    
    setTimeoutId(newTimeoutId);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', searchType, debouncedTerm],
    queryFn: () => searchContent(debouncedTerm, searchType),
    enabled: debouncedTerm.length > 2,
  });

  const handleItemClick = (item: Movie | TVShow) => {
    if ('title' in item) {
      navigate(`/movie/${item.id}`);
    } else {
      navigate(`/tv-show/${item.id}`);
    }
  };

  return (
    <div className="w-full bg-[#020d18] py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="searchType"
                checked={searchType === 'movie'}
                onChange={() => setSearchType('movie')}
                className="accent-[#ffc107] w-4 h-4"
              />
              <span className="text-white">Movies</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="searchType"
                checked={searchType === 'tv'}
                onChange={() => setSearchType('tv')}
                className="accent-[#ffc107] w-4 h-4"
              />
              <span className="text-white">TV Shows</span>
            </label>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${searchType === 'movie' ? 'movies' : 'TV shows'}...`}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-[#ffc107]"
            />

            {/* Search Results */}
            {debouncedTerm.length > 2 && (
              <div className="absolute w-full mt-2 bg-[#020d18] border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {isLoading && (
                  <div className="p-4 text-center">
                    <LoadingSpinner />
                  </div>
                )}
                
                {error && (
                  <div className="p-4 text-center text-red-500">
                    {error instanceof Error ? error.message : 'An error occurred while searching'}
                  </div>
                )}

                {!isLoading && !error && data?.results.length === 0 && (
                  <div className="p-4 text-center text-gray-400">
                    No results found
                  </div>
                )}

                {!isLoading && !error && data?.results.map((item) => {
                  // Get title/name and release/air date safely
                  const title = 'title' in item ? item.title : item.name;
                  const date = 'release_date' in item ? item.release_date : item.first_air_date;
                  const year = date ? new Date(date).getFullYear() : null;
                  const rating = item.vote_average ? Math.round(item.vote_average * 10) / 10 : null;

                  return (
                    <div
                      key={item.id}
                      className="p-3 hover:bg-gray-800 cursor-pointer flex items-center gap-3 border-b border-gray-700 last:border-b-0"
                      onClick={() => handleItemClick(item)}
                    >
                      {/* Poster with fallback */}
                      <div className="w-12 h-18 bg-gray-800 rounded flex-shrink-0 overflow-hidden">
                        {item.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                            alt={title || 'Movie/Show poster'}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs text-center p-1">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Title and Year */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">
                          {title || 'Untitled'}
                        </h3>
                        {year && (
                          <p className="text-gray-400 text-sm">
                            {year}
                          </p>
                        )}
                      </div>

                      {/* Rating Badge */}
                      {rating !== null && (
                        <div className="text-yellow-500 font-bold bg-yellow-500/10 px-2 py-1 rounded">
                          {rating}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection; 