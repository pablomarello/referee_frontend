import React, { useEffect, useState } from 'react'
import { useUsers } from '../../hooks/useUsers';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const { getUserById } = useUsers();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchUser = async () => {
        try {
          const data = await getUserById(id);
          setUser(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, [id, getUserById])

    if (loading) {
    return <p className="mt-20 text-center text-lg">Cargando Usuario...</p>;
  }

  if (!user) {
    return <p className="mt-20 text-center text-lg text-red-600">Usuario no encontrado</p>;
  }
  return (
    <div className="mt-10 text-black p-4 max-w-xl mx-auto">
      <div className="border p-4 rounded shadow bg-white">
        <h3 className="text-xl font-bold mb-4">Descripción del Usuario</h3>
        <h4>ID: {user._id}</h4>
        <h4>Nombre de usuario: {user.username}</h4>
        <h4>Email: {user.email}</h4>
        <h4>Rol: {user.role}</h4>
        <h4>Tipo de árbitro: {user.type_referee}</h4>
        <h4>Activo: {user.active}</h4>
        <h4>Fecha de creación: {user.createdAt}</h4>
      </div>
    </div>
  )
}

export default UserDetail