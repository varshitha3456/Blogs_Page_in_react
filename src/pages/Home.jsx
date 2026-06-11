import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto mt-16 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Blog App</h1>
      <p className="text-gray-500 text-lg mb-8">
        Read, write, and manage your posts all in one place.
      </p>
      <Link
        to="/posts"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-medium"
      >
        Browse Posts
      </Link>
    </div>
  );
}