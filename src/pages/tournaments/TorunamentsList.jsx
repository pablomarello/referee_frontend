import { Link } from 'react-router-dom'
import { useTournaments } from '../../hooks/useTournaments'

const TorunamentsList = () => {
  const { tournaments, loading, error, deleteTournament } = useTournaments()

  if (loading) return <div className="p-4 text-gray-600">Loading...</div>
  if (error) return <div className="p-4 text-red-600">Error: {error?.message ?? String(error)}</div>
  return (
    <>
    <div className="bg-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between p-8">
      <div className="flex items-center gap-3">
      <svg
  xmlns="http://www.w3.org/2000/svg"
  width="42"
  height="42"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="text-primary-500"
>
  {/* Copa */}
  <path d="M8 4h8v4a4 4 0 0 1-8 0V4z" />

  {/* Asas */}
  <path d="M4 6h4v2a4 4 0 0 1-4-4V6z" />
  <path d="M20 6h-4v2a4 4 0 0 0 4-4V6z" />

  {/* Base */}
  <path d="M12 12v4" />
  <path d="M8 20h8" />
  <path d="M10 16h4" />
</svg>

<div>
            <h1 className="text-2xl font-bold text-gray-900">Torneos</h1>
            <p className="text-sm text-gray-600">Gestiona los torneos</p>
          </div>

      </div>
      <Link
        to="/dashboard/tournaments/create"
        className="mt-3 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md active:scale-95 transition-transform"
      >
        + Nuevo Torneo
      </Link>
    </div>

    
    <div className="p-6">
      
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NOMBRE</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AÑO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FECHA CREACIÓN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tournaments?.length ? (
              tournaments.map((tournament) => (
                <tr key={tournament.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tournament._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{tournament.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tournament.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tournament.createdAt ? new Date(tournament.createdAt).toLocaleString() : ''}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/dashboard/tournaments/${tournament._id}`}
                        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md active:scale-95 transition-transform"
                      >
                        Ver
                      </Link>
                      <Link
                        to={`/dashboard/tournaments/${tournament._id}/edit`}
                        className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md active:scale-95 transition-transform"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => deleteTournament(tournament._id)}
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
                <td colSpan="9" className="px-6 py-8 text-center text-sm text-gray-500">No hay partidos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default TorunamentsList