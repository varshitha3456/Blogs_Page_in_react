import { useNavigate } from "react-router-dom";

export default function PostCard({ post, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition flex flex-col">
      <p className="text-xs text-gray-400 mb-1">Post #{post.id}</p>
      <h3
        className="font-semibold text-gray-800 capitalize mb-2 cursor-pointer hover:text-blue-500 transition"
        onClick={() => navigate(`/posts/${post.id}`)}
      >
        {post.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 flex-grow">
        {post.body.substring(0, 100)}...
      </p>
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => navigate(`/posts/${post.id}`)}
          className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-200 transition"
        >
          Read
        </button>
        <button
          onClick={() => onEdit(post)}
          className="bg-yellow-400 text-white px-3 py-1 rounded text-sm hover:bg-yellow-500 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
