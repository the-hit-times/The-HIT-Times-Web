export default function TspPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 px-6 py-12">
      <div className="text-center space-y-8">
        {/* Main Heading */}
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse leading-[1.2]">
          TSP - Coming Soon
        </h1>

        {/* Subtext */}
        <p className="text-xl text-gray-700 mt-6 leading-relaxed">
          {"We're crafting something incredible. Stay tuned for the big reveal!"}
        </p>

        {/* Call-to-action */}
        <a
          href="/"
          className="mt-12 inline-block px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
