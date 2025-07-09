import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="bg-primary py-4">
      <nav className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-[22px] md:text-[25px] font-[900] uppercase text-white font-montserrat tracking-wide hover:text-yellow-400 transition-colors"
          >
            FLIXX
          </Link>
          
          <div className="flex gap-4 md:gap-6 text-[14px] md:text-[16px] font-roboto">
            <Link 
              to="/" 
              className={`${
                location.pathname === '/' ? 'text-yellow-500 font-medium' : 'text-white'
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