import React, { useEffect, useState } from 'react'
import { useUsers } from '../../hooks/useUsers';
import { Link, useParams } from 'react-router-dom';

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
      {/* Botón de volver */}
      <div className="mb-6">
        <Link 
          to="/dashboard/users" 
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Volver al listado
        </Link>
      </div>
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