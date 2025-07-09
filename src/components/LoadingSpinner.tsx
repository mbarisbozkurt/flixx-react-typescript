export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#020d18] py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    </div>
  );
} 