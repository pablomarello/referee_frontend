import { useMatches } from '../../hooks/useMatches'
import { Link } from 'react-router-dom'
import { ClipLoader } from "react-spinners"
import { deleteMatch } from '../../services/matches.api'
import { useAuth } from '../../context/AuthContext'
import CreateButton from '../../components/common/CreateButton'
import Can from '../../components/common/Can'

const MatchesList2 = () => {
  const { matches, loading, error, deleteMatch } = useMatches()
  const { user } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <ClipLoader
          size={55}
          color="#c5224b" // verde (tailwind green-500)
          loading={loading}
        />
      </div>
    )
  }

  if (error) return <div className="p-4 text-red-600">Error: {error?.message ?? String(error)}</div>
  return (
    <>
      {/* HEADER */}
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
            {/* Borde de la cancha */}
            <rect x="3" y="2" width="18" height="20" rx="2" ry="2" />

            {/* Línea central */}
            <line x1="12" y1="2" x2="12" y2="22" />

            {/* Círculo central */}
            <circle cx="12" cy="12" r="2" />

            {/* Áreas */}
            <rect x="3" y="7" width="3" height="10" />
            <rect x="18" y="7" width="3" height="10" />
          </svg>


          <div>
            <h1 className="text-2xl font-bold text-gray-900">Partidos</h1>
            <p className="text-sm text-gray-600">Gestiona los partidos</p>
          </div>
        </div>

        <CreateButton
          to="/dashboard/matches/create"
          label="Crear Partido"
          permission="create:partidos"
        />
        {/* {user.permissions.includes("create:usuarios") && (
          <Link
            to="/dashboard/matches/create"
            className="mt-4 sm:mt-0 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md active:scale-95 transition-transform"
          >
            Crear partido
          </Link>
        )} */}

      </div>

      {/* TABLA */}
      <div className="p-6">
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipo local</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipo visitante</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lugar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha y hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Torneo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {matches?.length ? (
                matches.map(match => (
                  <tr key={match._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{match._id}</td>
                    <td className="px-6 py-4 text-sm">{match.status}</td>
                    <td className="px-6 py-4 text-sm">{match.home_team?.name ?? match.home_team}</td>
                    <td className="px-6 py-4 text-sm">{match.away_team?.name ?? match.away_team}</td>
                    <td className="px-6 py-4 text-sm">{match.location}</td>
                    <td className="px-6 py-4 text-sm">
                      {match.date ? new Date(match.date).toLocaleString() : ''}
                    </td>
                    <td className="px-6 py-4 text-sm">{match.category?.name ?? match.category}</td>
                    <td className="px-6 py-4 text-sm">{match.tournament?.name ?? match.tournament}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <Can permission="read:partidos">
                          <Link
                            to={`/dashboard/matches/${match._id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md"
                          >
                            Ver
                          </Link>
                        </Can>
                        <Can permission="update:partidos">
                          <Link
                            to={`/dashboard/matches/${match._id}/edit`}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md"
                          >
                            Editar
                          </Link>
                        </Can>
                        <Can permission="delete:partidos">
                          <button
                            onClick={() => deleteMatch(match._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                          >
                            Eliminar
                          </button>
                        </Can>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-8 text-center text-sm text-gray-500">
                    No hay partidos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>



  )
}

export default MatchesList2