import { Link } from "react-router-dom";

export default function Navbar() {
  function handleContact() {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center sticky top-0 z-10">
      <Link to="/" className="text-white text-2xl font-bold">Blog App</Link>
      <div className="flex gap-6">
        <Link to="/" className="text-white hover:text-blue-200 transition">Home</Link>
        <Link to="/posts" className="text-white hover:text-blue-200 transition">Posts</Link>
        <button onClick={handleContact} className="text-white hover:text-blue-200 transition">
          Contact
        </button>
      </div>
      <Link
        to="/posts?new=true"
        className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-blue-50 transition"
      >
        Add Post
      </Link>
    </nav>
  );
}