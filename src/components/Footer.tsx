const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNowPlayingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('nowPlaying');
    if (element) {
      const offset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#020d18] text-gray-300 py-8 md:py-12 mt-8 border-t border-gray-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold text-lg mb-3 md:mb-4">About Flixx</h3>
            <p className="text-sm leading-relaxed font-medium">
              Discover the latest movies and TV shows with Flixx. 
              Get comprehensive information about release dates, ratings, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold text-lg mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <a href="/" className="hover:text-[#ffc107] transition-colors">Movies</a>
              </li>
              <li>
                <a href="/tv-shows" className="hover:text-[#ffc107] transition-colors">TV Shows</a>
              </li>
              <li>
                <a 
                  href="/#nowPlaying" 
                  className="hover:text-[#ffc107] transition-colors"
                  onClick={handleNowPlayingClick}
                >
                  Now Playing
                </a>
              </li>
            </ul>
          </div>

          {/* TMDB Attribution */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold text-lg mb-3 md:mb-4">Powered By</h3>
            <div className="flex justify-center sm:justify-start">
              <a 
                href="https://www.themoviedb.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                  alt="TMDB Logo"
                  className="h-10 md:h-12 hover:opacity-90 transition-opacity"
                />
              </a>
            </div>
            <p className="text-xs mt-2 font-medium">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-800 text-center text-sm font-medium">
          <p>© {currentYear} Flixx. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 