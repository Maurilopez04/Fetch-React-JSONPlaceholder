import { useEffect, useState } from "react";

function Users() {
  const API_URL = "https://jsonplaceholder.typicode.com/";
  const [users, setUsers] = useState([]);
  const [albumsByUser, setAlbumsByUser] = useState({});
  const [visibleAlbumByUser, setVisibleAlbumByUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL + `users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {setError({ message: error.message });setLoading(false)})
      .finally(() => setLoading(false));
  }, []);

  const toggleAlbums = (userId) => {
    setVisibleAlbumByUser((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));

    if (!albumsByUser[userId]) {
      fetch(API_URL + `albums?userId=${userId}`)
        .then((response) => response.json())
        .then((data) =>
          setAlbumsByUser((prev) => ({
            ...prev,
            [userId]: data,
          }))
        )
        .catch((error) =>
          setError((prev) => ({
            ...prev,
            [userId]: { message: error.message },
          }))
        );
    }
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-bold text-blue-600">Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-bold text-red-600">
          Error: {error.message}
        </p>
      </div>
    );
  }

  return (
    <main className="flex-grow w-full max-w-4xl mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Fetch Users usando JSONPlaceholder
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-bold text-blue-700 mb-2">
              {user.name}
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Usuario:</span> {user.username}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Email:</span>{" "}
              <a
                href={`mailto:${user.email}`}
                className="text-blue-600 underline"
              >
                {user.email}
              </a>
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Teléfono:</span> {user.phone}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Sitio web:</span>{" "}
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {user.website}
              </a>
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Dirección:</span>{" "}
              {`${user.address.street}, ${user.address.suite}, ${user.address.city} (${user.address.zipcode})`}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Empresa:</span>{" "}
              {user.company.name} -{" "}
              <span className="italic">{user.company.catchPhrase}</span>
            </p>

            <button
              className="text-sm font-semibold text-blue-500 hover:text-blue-700 mb-4"
              onClick={() => toggleAlbums(user.id)}
            >
              {visibleAlbumByUser[user.id] ? "Ocultar Albunes" : "Mostrar Albunes"}
            </button>
            {visibleAlbumByUser[user.id] && (
              <div>
                {albumsByUser[user.id] ? (
                  <ul className="space-y-3">
                    {albumsByUser[user.id].map((album) => (
                      <li
                        key={album.id}
                        className="bg-gray-100 rounded-lg p-3 shadow"
                      >
                        <p className="text-sm text-blue-600">
                          <span className="font-bold text-black">Titulo:</span> <a href={`/album/${album.id}`}>{album.title}</a>
                        </p>
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

export default Users;
