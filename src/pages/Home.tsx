import NowPlaying from '../components/NowPlaying';
import SearchSection from '../components/SearchSection';
import PopularMovies from '../components/PopularMovies';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      <NowPlaying />
      <SearchSection />
      <PopularMovies />
      <Footer />
    </div>
  );
};

export default Home; 