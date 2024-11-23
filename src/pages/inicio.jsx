import { useEffect, useState } from "react";

function Inicio() {
  const API_URL = "https://jsonplaceholder.typicode.com/";
  const [posts, setPosts] = useState([]);
  const [commentsByPost, setCommentsByPost] = useState({});
  const [visibleCommentByPost, setVisibleCommentByPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar publicaciones
    fetch(API_URL + `posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => setError({ message: error.message }))
      .finally(() => setLoading(false));
  }, []);

  const toggleComments = (postId) => {
    setVisibleCommentByPost((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    if (!commentsByPost[postId]) {
      fetch(API_URL + `comments?postId=${postId}`)
        .then((response) => response.json())
        .then((data) =>
          setCommentsByPost((prev) => ({
            ...prev,
            [postId]: data,
          }))
        )
        .catch((error) =>
          setError((prev) => ({
            ...prev,
            [postId]: { message: error.message },
          }))
        );
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-grow w-full max-w-4xl mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Fetch usando JSONPlaceholder
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-bold text-blue-700 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-700 mb-4">{post.body}</p>

            <button
              className="text-sm font-semibold text-blue-500 hover:text-blue-700 mb-4"
              onClick={() => toggleComments(post.id)}
            >
              {visibleCommentByPost[post.id] ? "Ocultar Comentarios" : "Mostrar Comentarios"}
            </button>

            {visibleCommentByPost[post.id] && (
              <div>
                {commentsByPost[post.id] ? (
                  <ul className="space-y-3">
                    {commentsByPost[post.id].map((comment) => (
                      <li
                        key={comment.id}
                        className="bg-gray-100 rounded-lg p-3 shadow"
                      >
                        <p className="text-sm text-gray-600">
                          <span className="font-bold">Nombre:</span> {comment.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-bold">Email:</span> {comment.email}
                        </p>
                        <p className="text-sm text-black">{comment.body}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Cargando comentarios...</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default Inicio;
