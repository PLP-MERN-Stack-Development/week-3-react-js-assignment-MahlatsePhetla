import { useEffect, useState } from 'react';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1'); 
      const data = await res.json();
      setPosts([data]);
      setFiltered([data]);
      setLoading(false);
    } catch (err) {
      setError('Failed to load posts');
      setLoading(false);
    }
  };

  fetchPosts();
}, []);


  useEffect(() => {
    const term = search.toLowerCase();
    const filteredData = posts.filter(post =>
      post.title.toLowerCase().includes(term)
    );
    setFiltered(filteredData);
    setPage(1); 
  }, [search, posts]);

  const paginated = filtered.slice((page - 1) * postsPerPage, page * postsPerPage);
  const totalPages = Math.ceil(filtered.length / postsPerPage);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Posts</h2>

      <input
        type="text"
        placeholder="Search posts..."
        className="mb-4 p-2 w-full rounded border dark:bg-gray-800 dark:text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p className="text-gray-600 dark:text-gray-300">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {paginated.map(post => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-700 p-4 rounded shadow hover:scale-105 transition"
          >
            <h3 className="font-semibold text-lg dark:text-white">{post.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{post.body}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-600 dark:text-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
