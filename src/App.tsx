import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TvShows from './pages/TvShows';
import MovieDetails from './pages/MovieDetails';
import ShowDetails from './pages/ShowDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv-shows" element={<TvShows />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv-show/:id" element={<ShowDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
