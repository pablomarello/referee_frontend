import { useMatches } from '../../hooks/useMatches'
import { Link } from 'react-router-dom'
import { deleteMatch } from '../../services/matches.api'

const MatchesList2 = () => {
  const { matches, loading, error, deleteMatch } = useMatches()

  if (loading) return <div className="p-4 text-gray-600">Loading...</div>
  if (error) return <div className="p-4 text-red-600">Error: {error?.message ?? String(error)}</div>
  return (
    <div className="p-4">
      <Link
        to="/dashboard/matches/create"
        className="mt-3 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md active:scale-95 transition-transform"
      >
        Crear partido
      </Link>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ESTADO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EQUIPO LOCAL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EQUIPO VISITANTE</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LUGAR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FECHA Y HORA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORIA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TORNEO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matches?.length ? (
              matches.map((match) => (
                <tr key={match.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{match._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{match.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{match.home_team?.name ?? match.home_team}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{match.away_team?.name ?? match.away_team}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{match.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{match.date ? new Date(match.date).toLocaleString() : ''}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{match.category?.name ?? match.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{match.tournament?.name ?? match.tournament}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/dashboard/matches/${match._id}`}
                        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md active:scale-95 transition-transform"
                      >
                        Ver
                      </Link>
                      <Link
                        to={`/dashboard/matches/${match._id}/edit`}
                        className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md active:scale-95 transition-transform"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => deleteMatch(match._id)}
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
  )
}

export default MatchesList2