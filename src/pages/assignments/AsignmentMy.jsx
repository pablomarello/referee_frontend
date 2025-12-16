import { Link } from "react-router-dom";
import { useAssignments } from "../../hooks/useAssignments";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../../context/AuthContext"

const AsignmentMy = () => {
  const { assignments, loading, error } = useAssignments();
  const { user } = useAuth()

  

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

const myAssignments = assignments?.filter(assignment => {
  if (!user) return false

  const userId = user.id.toString()

  return (
    assignment.referee_id?._id?.toString() === userId ||
    assignment.assistant1_id?._id?.toString() === userId ||
    assignment.assistant2_id?._id?.toString() === userId
  )
})





  return (
    <>
      <div className="bg-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between p-8">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-cog mr-3 text-primary-500"><circle cx="18" cy="15" r="3"></circle><circle cx="9" cy="7" r="4"></circle><path d="M10 15H6a4 4 0 0 0-4 4v2"></path><path d="m21.7 16.4-.9-.3"></path><path d="m15.2 13.9-.9-.3"></path><path d="m16.6 18.7.3-.9"></path><path d="m19.1 12.2.3-.9"></path><path d="m19.6 18.7-.4-1"></path><path d="m16.8 12.3-.4-1"></path><path d="m14.3 16.6 1-.4"></path><path d="m20.7 13.8 1-.4"></path></svg>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mis Designaciones</h1>
            <p className="text-sm text-gray-600">Gestiona las designaciones arbitrales en las que estas incluido</p>
          </div>

        </div>

      </div>

      {/* TABLA */}
      <div className="p-6">

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PARTIDO ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ARBITRO ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ASISTENTE 1 ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ASISTENTE 2 ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OBSERVACIONES</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FECHA DE CREACIÓN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myAssignments?.length ? (
                myAssignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {assignment.match_id
                        ? `${assignment.match_id.home_team} vs ${assignment.match_id.away_team}`
                        : ''}
                    </td>

                    <td>{assignment.referee_id?.username ?? '—'}</td>
                    <td>{assignment.assistant1_id?.username ?? '—'}</td>
                    <td>{assignment.assistant2_id?.username ?? '—'}</td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{assignment.observations}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{assignment.assignedAt ? new Date(assignment.assignedAt).toLocaleString() : ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/dashboard/assignments/${assignment._id}`}
                          className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md active:scale-95 transition-transform"
                        >
                          Ver
                        </Link>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-8 text-center text-sm text-gray-500">
                    No tenés designaciones asignadas
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

export default AsignmentMy