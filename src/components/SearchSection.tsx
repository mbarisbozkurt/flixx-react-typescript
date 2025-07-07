import { useState } from 'react';

const SearchSection = () => {
  const [searchType, setSearchType] = useState<'movies' | 'tvshows'>('movies');

  return (
    <div className="w-full bg-[#020d18] py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="searchType"
                checked={searchType === 'movies'}
                onChange={() => setSearchType('movies')}
                className="accent-[#ffc107] w-4 h-4"
              />
              <span className="text-white">Movies</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="searchType"
                checked={searchType === 'tvshows'}
                onChange={() => setSearchType('tvshows')}
                className="accent-[#ffc107] w-4 h-4"
              />
              <span className="text-white">TV Shows</span>
            </label>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter search term"
              className="flex-1 bg-transparent border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-[#ffc107]"
            />
            <button className="bg-[#ffc107] text-black px-6 py-2 rounded hover:bg-[#e5ac00] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection; 