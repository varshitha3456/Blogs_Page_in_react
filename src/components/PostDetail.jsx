import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = "https://jsonplaceholder.typicode.com/posts";

export default function PostDetail({ posts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const local = posts?.find((p) => String(p.id) === String(id));
    if (local) {
      setPost(local);
      setLoading(false);
      return;
    }

    axios
      .get(`${API}/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, posts]);

  if (loading)
    return <div className="max-w-3xl mx-auto mt-12 px-4 text-gray-500">Loading post...</div>;

  if (!post)
    return (
      <div className="max-w-3xl mx-auto mt-12 px-4">
        <p className="text-gray-600 mb-4">Post not found.</p>
        <button onClick={() => navigate(-1)} className="text-blue-500 hover:underline">
          ← Back
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 pb-12">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:underline mb-6 inline-flex items-center gap-1"
      >
        ← Back
      </button>
      <div className="bg-white rounded-xl shadow p-8">
        <p className="text-xs text-gray-400 mb-2">Post #{post.id}</p>
        <h1 className="text-2xl font-bold text-gray-800 capitalize mb-4">{post.title}</h1>
        <hr className="mb-4" />
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.body}</p>
      </div>
    </div>
  );
}