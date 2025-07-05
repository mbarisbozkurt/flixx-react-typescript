export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Welcome to Flixx</h1>
        <p className="text-gray-600">
          Here you will find the latest movies and TV shows.
          Coming soon:
        </p>
        <ul className="list-disc ml-6 mt-4 space-y-2">
          <li>Now Playing Movies</li>
          <li>Popular Movies</li>
          <li>Movie Details</li>
          <li>Rating and Reviews</li>
        </ul>
      </div>
    </div>
  );
} 