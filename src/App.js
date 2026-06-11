import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./components/PostDetail";

export default function App() {
  const [posts, setPosts] = useState([]);

  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts posts={posts} setPosts={setPosts} />} />
            <Route path="/posts/:id" element={<PostDetail posts={posts} />} />
          </Routes>
        </div>
        <footer id="contact" className="bg-blue-500 text-white py-6 px-4 mt-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-semibold text-lg mb-2">Contact Us</p>
            <p className="text-sm">Email: support@blogapp.com</p>
            <p className="text-sm">Phone: +1 (123) 456-7890</p>
            <p className="text-sm">Location: Hyderabad, India</p>
            <p className="text-xs mt-4 text-blue-200">© {new Date().getFullYear()} Blog App</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}