import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="bg-primary py-4">
      <nav className="container mx-auto px-4">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="text-[25px] font-[900] uppercase text-white ml-16 font-montserrat tracking-wide hover:text-yellow-400 transition-colors"
          >
            FLIXX
          </Link>
          
          <div className="flex gap-6 text-[16px] ml-auto mr-24 font-roboto">
            <Link 
              to="/movies" 
              className={`${
                location.pathname === '/movies' ? 'text-yellow-500 font-medium' : 'text-white'
              } hover:text-yellow-400 transition-colors`}
            >
              Movies
            </Link>
            <Link 
              to="/tv-shows" 
              className={`${
                location.pathname === '/tv-shows' ? 'text-yellow-500 font-medium' : 'text-white'
              } hover:text-yellow-400 transition-colors`}
            >
              TV Shows
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar; 