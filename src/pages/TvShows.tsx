import { useQuery } from '@tanstack/react-query';
import { fetchPopularTVShows, type TVShowResponse } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const TvShows = () => {
  const { data, isLoading, error } = useQuery<TVShowResponse>({
    queryKey: ['popularTVShows'],
    queryFn: fetchPopularTVShows
  });

  const navigate = useNavigate();

  if (error) return <div>Error: {error.message}</div>;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full bg-[#020d18] min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-xl md:text-2xl text-white font-bold mb-6 md:mb-8 text-center tracking-wide">
          POPULAR TV SHOWS
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {data?.results.map((show: any) => (
            <div 
              key={show.id} 
              className="relative group cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
              onClick={() => navigate(`/tv-show/${show.id}`)}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
              
              {/* TV Show Poster */}
              <div className="aspect-[2/3] bg-gray-800">
                <img
                  src={show.poster_path ? 'https://image.tmdb.org/t/p/w500' + show.poster_path : 'https://via.placeholder.com/500x750?text=No+Image'}
                  alt={show.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* TV Show Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 sm:p-3 md:p-4 pt-8 sm:pt-10 md:pt-12">
                <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 line-clamp-1">
                  {show.name}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm opacity-90">
                  First Air: {new Date(show.first_air_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  }).replace(/\//g, '/')}
                </p>
              </div>

              {/* Rating Badge */}
              <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
                {Math.round(show.vote_average * 10) / 10}
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ffc107]/80 rounded-lg transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvShows; 