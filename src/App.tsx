import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TvShows from './pages/TvShows';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv-shows" element={<TvShows />} />
          {/* Add more routes as you create the components */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
