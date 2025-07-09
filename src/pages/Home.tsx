import NowPlaying from '../components/NowPlaying';
import SearchSection from '../components/SearchSection';
import PopularMovies from '../components/PopularMovies';

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      <NowPlaying />
      <SearchSection />
      <PopularMovies />
    </div>
  );
};

export default Home; 