import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";

const API = "https://jsonplaceholder.typicode.com/posts";

export default function Posts({ posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
    if (posts.length === 0) {
      axios.get(API + "?_limit=12").then((res) => {
        setPosts(res.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setShowForm(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  function createPost() {
    const data = JSON.stringify({ title, body, userId: 1 });
    axios
      .post(API, data, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        const newPost = { ...res.data, id: Date.now() };
        setPosts([newPost, ...posts]);
        resetForm();
      });
  }

  function updatePost() {
    const data = JSON.stringify({ title, body, userId: 1 });
    if (editId > 100) {
      setPosts(posts.map((p) => (p.id === editId ? { ...p, title, body } : p)));
      resetForm();
      return;
    }
    axios
      .put(`${API}/${editId}`, data, { headers: { "Content-Type": "application/json" } })
      .then(() => {
        setPosts(posts.map((p) => (p.id === editId ? { ...p, title, body } : p)));
        resetForm();
      });
  }

  function deletePost(id) {
    if (!window.confirm("Are you sure you want to delete?")) return;
    if (id > 100) {
      setPosts(posts.filter((p) => p.id !== id));
      return;
    }
    axios.delete(`${API}/${id}`).then(() => {
      setPosts(posts.filter((p) => p.id !== id));
    });
  }

  function handleSubmit() {
    if (!title.trim() || !body.trim()) {
      alert("Please fill all fields");
      return;
    }
    editId ? updatePost() : createPost();
  }

  function handleEdit(post) {
    setEditId(post.id);
    setTitle(post.title);
    setBody(post.body);
    setShowForm(true);
    window.scrollTo(0, 0);
  }

  function resetForm() {
    setTitle("");
    setBody("");
    setEditId(null);
    setShowForm(false);
  }

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4 pb-12">
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Posts</h2>
        {!showForm && (
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            + Add Post
          </button>
        )}
      </div> */}

      {showForm && (
        <div className="max-w-xl bg-white p-6 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-3">
            {editId ? "Edit Post" : "Add New Post"}
          </h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-3"
          />
          <textarea
            placeholder="Write something..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 p-2 rounded mb-3"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Save
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading && <p className="text-gray-500">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={deletePost}
          />
        ))}
      </div>
    </div>
  );
}