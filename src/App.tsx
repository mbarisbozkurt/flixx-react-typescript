import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 w-full">
        <nav className="bg-blue-600 text-white w-full">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">Flixx</Link>
            <div className="space-x-4">
              <Link to="/" className="hover:text-blue-200">Movies</Link>
              <Link to="/shows" className="hover:text-blue-200">TV Shows</Link>
              <Link to="/search" className="hover:text-blue-200">Search</Link>
            </div>
          </div>
        </nav>

        <main className="w-full py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes as you create the components */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
