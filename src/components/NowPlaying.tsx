import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { fetchNowPlayingMovies } from '../services/api';
import type { Movie } from '../types/tmdb';
import LoadingSpinner from './LoadingSpinner';

import './NowPlaying.css';

const NowPlaying = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: fetchNowPlayingMovies
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <section id="nowPlaying" className="now-playing-section py-8 md:py-12">
        <div className="now-playing-content container mx-auto px-4">
          <h2 className="text-xl md:text-2xl text-center mb-6 md:mb-8">
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
      <section id="nowPlaying" className="now-playing-section py-8 md:py-12">
        <div className="now-playing-content container mx-auto px-4">
          <h2 className="text-xl md:text-2xl text-center mb-6 md:mb-8">
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
    <section id="nowPlaying" className="now-playing-section py-8 md:py-12">
      <div className="now-playing-content container mx-auto px-4">
        <h2 className="text-xl md:text-2xl text-center mb-6 md:mb-8">
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
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30
            }
          }}
        >
          {data?.results.map((movie: Movie) => (
            <SwiperSlide key={movie.id}>
              <div 
                className="relative group cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                
                {/* Movie Poster */}
                <div className="aspect-[2/3] bg-gray-800">
                  <img 
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Rating Badge */}
                <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-sm md:text-base font-bold">
                  {Math.round(movie.vote_average * 10) / 10}
                </div>

                {/* Movie Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 sm:p-3 md:p-4 pt-8 sm:pt-10 md:pt-12">
                  <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 line-clamp-1">
                    {movie.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm opacity-90">
                    Release: {new Date(movie.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    }).replace(/\//g, '/')}
                  </p>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ffc107]/80 rounded-lg transition-colors duration-300" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NowPlaying; 