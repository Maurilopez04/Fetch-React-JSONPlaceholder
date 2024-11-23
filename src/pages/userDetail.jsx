import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function UserDetail(){
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [albums, setAlbum]= useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                const userData = await response.json();
                setUser(userData);
                setLoading(false)
                } catch (error) {
                    setError(error);
                    setLoading(false)
                }}
              fetchUser()}, [id]);
                
              useEffect(() => {
                const fetchAlbum = async () => {
                    try {
                        const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
                            const albumData = await response.json();
                            setAlbum(albumData);
                            setLoading(false)
                            } catch (error) {
                                setError(error);
                                setLoading(false);
                            }}
                                fetchAlbum()}, [id]);
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
<div className="bg-white rounded-lg shadow-lg p-6 mt-20 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold text-blue-700 mb-2">
            <a href={`/user/${user.username}`}>{user.name}</a>
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
            <h5 className="font-bold text-blue-500">Albums</h5>

              <div>
                {albums ? (
                  <ul className="space-y-3">
                    {albums.map((album) => (
                      <li
                        key={album.id}
                        className="bg-gray-100 rounded-lg p-3 shadow"
                      >
                        <p className="text-sm text-blue-600">
                          <span className="font-bold text-black">Titulo:</span> <a href={`/albums/${album.id}`}>{album.title}</a>
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Cargando Albums...</p>
                )}
              </div>
          </div>
    )
}
export default UserDetail;