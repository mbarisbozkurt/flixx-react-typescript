// Import Swiper styles first
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Then import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { fetchNowPlayingMovies, type Movie } from '../services/api';

// Add custom styles for Swiper
import './NowPlaying.css';

const NowPlaying = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: fetchNowPlayingMovies
  });

  // console.log('NowPlaying state:', { data, isLoading, isError, error });

  if (isLoading) {
    return (
      <section className="now-playing-section py-12">
        <div className="now-playing-content container mx-auto px-4">
          <h2 className="text-center mb-8">
            NOW PLAYING
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="now-playing-section py-12">
        <div className="now-playing-content container mx-auto px-4">
          <h2 className="text-center mb-8">
            NOW PLAYING
          </h2>
          <div className="text-center text-red-500">
            Error loading movies. Please try again later.
            {error instanceof Error && <p>{error.message}</p>}
          </div>
        </div>
      </section>
    );
  }

  if (!data?.results?.length) {
    return (
      <section className="now-playing-section py-12">
        <div className="now-playing-content container mx-auto px-4">
          <h2 className="text-center mb-8">
            NOW PLAYING
          </h2>
          <div className="text-center text-yellow-500">
            No movies found.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="now-playing-section py-12">
      <div className="now-playing-content container mx-auto px-4">
        <h2 className="text-center mb-8">
          NOW PLAYING
        </h2>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30
            }
          }}
        >
          {data?.results.map((movie: Movie) => (
            <SwiperSlide key={movie.id}>
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto aspect-[2/3] object-cover"
                />
                <div className="p-4">
                  <p className="movie-title truncate">{movie.title}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="rating text-yellow-500 ml-1">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NowPlaying; 