import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TMDB, fetchMovieDetails } from '../services/api';
import type { MovieDetails } from '../types/tmdb';
import LoadingSpinner from '../components/LoadingSpinner';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: movie, isLoading, error } = useQuery<MovieDetails>({
    queryKey: ['movie', id],
    queryFn: () => {
      if (!id) throw new Error('Movie ID is required');
      return fetchMovieDetails(id);
    }
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error instanceof Error ? error.message : 'Failed to fetch movie details'}</div>;
  if (!movie) return null;

  return (
    <div className="min-h-screen bg-[#020d18]">
      {/* Hero Section with Backdrop */}
      <div 
        className="relative min-h-[70vh] bg-cover bg-center pt-8"
        style={{
          backgroundImage: `linear-gradient(rgba(2, 13, 24, 0.7), rgba(2, 13, 24, 0.7)), url(${movie.backdrop_path ? TMDB.originalImage(movie.backdrop_path) : ''})`,
          backgroundColor: '#020d18',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d18] via-transparent to-[#020d18]/30" />

        <div className="container mx-auto px-4 max-w-7xl relative">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 text-white bg-[#020d18] border-2 border-yellow-500 rounded-md px-6 py-2.5 hover:bg-yellow-500 hover:text-black transition-all duration-300 w-fit mt-4 font-roboto font-medium text-base min-w-[160px] shadow-lg"
          >
            <span>←</span> Back to Movies
          </button>

          <div className="flex items-end h-full py-16">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              {/* Poster */}
              <div className="w-80 md:w-96 shrink-0">
                <img
                  src={movie.poster_path ? TMDB.w500Image(movie.poster_path) : 'https://via.placeholder.com/500x750?text=No+Image'}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>

              {/* Movie Info */}
              <div className="text-white md:pt-12">
                <h1 className="text-5xl font-montserrat font-bold mb-6">{movie.title}</h1>
                
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-yellow-500 text-2xl">★</span>
                  <span className="text-2xl font-roboto font-medium">
                    {Math.round(movie.vote_average * 10) / 10}
                  </span>
                  <span className="text-xl text-gray-400 font-roboto font-medium">/ 10</span>
                </div>

                <div className="mb-6">
                  <span className="text-yellow-500 font-roboto font-medium">Release Date: </span>
                  <span className="text-gray-300 font-roboto">{new Date(movie.release_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>

                <p className="text-gray-300 font-roboto text-lg leading-relaxed mb-8 max-w-3xl">
                  {movie.overview}
                </p>

                <div className="mb-8">
                  <h3 className="text-yellow-500 font-montserrat font-bold mb-3">Genres</h3>
                  <div className="flex flex-wrap gap-3">
                    {movie.genres.map(genre => (
                      <span 
                        key={genre.id}
                        className="bg-[#0f2133] px-4 py-1.5 rounded-full text-sm font-roboto"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => movie.homepage ? window.open(movie.homepage, '_blank') : null}
                  className="inline-flex items-center justify-center text-white bg-[#020d18] border-2 border-yellow-500 rounded-md px-6 py-2.5 hover:bg-yellow-500 hover:text-black transition-all duration-300 font-roboto font-medium text-base min-w-[200px] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!movie.homepage}
                >
                  Visit Movie Homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <h2 className="text-3xl font-montserrat font-bold text-white mb-8 text-center">MOVIE INFO</h2>
        <div className="grid gap-4 text-gray-300">
          <div className="flex gap-2">
            <span className="text-yellow-500">Runtime:</span>
            <span>{movie.runtime} minutes</span>
          </div>
          <div className="flex gap-2">
            <span className="text-yellow-500">Budget:</span>
            <span>${movie.budget.toLocaleString()}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-yellow-500">Revenue:</span>
            <span>${movie.revenue.toLocaleString()}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-yellow-500">Status:</span>
            <span>{movie.status}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-yellow-500">Production Companies:</span>
            <span>{movie.production_companies.map(company => company.name).join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 