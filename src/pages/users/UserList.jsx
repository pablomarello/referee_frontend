import { Link } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import { ClipLoader } from "react-spinners";

const UserList = () => {
  const { users, loading, error, deleteUser } = useUsers();
  if (loading) {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <ClipLoader
        size={55}
        color="#c5224b"
        loading={loading}
      />
    </div>
  )
}
  if (error) return <div className="p-4 text-red-600">Error: {error?.message ?? String(error)}</div>
  return (
    <>
    <div className="bg-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between p-8">
      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users mr-3 text-primary-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
            <p className="text-sm text-gray-600">Gestiona los usuarios del sistema</p>
          </div>

      </div>
<Link
        to="/dashboard/users/create"
        className="mt-3 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md active:scale-95 transition-transform"
      >
        Crear usuario
      </Link>
    </div>

      <div className="p-6">
      
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USERNAME</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FECHA DE NACIMIENTO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TIPO DE ÁRBITRO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIVO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FECHA DE CREACIÓN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.length ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.date_of_birth
                      ? new Date(user.date_of_birth).toLocaleDateString("es-AR")
                      : "—"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
  {user.role?.name ?? "—"}
</td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.type_referee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.active ? "Activo" : "Inactivo"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.createdAt ? new Date(user.createdAt).toLocaleString() : ''}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/dashboard/users/${user._id}`}
                        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md active:scale-95 transition-transform"
                      >
                        Ver
                      </Link>
                      <Link
                        to={`/dashboard/users/${user._id}/edit`}
                        className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md active:scale-95 transition-transform"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="mt-3 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md active:scale-95 transition-transform"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-8 text-center text-sm text-gray-500">No hay usuarios</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
    
  )
}

export default UserList