import { Link } from "react-router-dom";
import { useAssignments } from "../../hooks/useAssignments";
import { deleteAssignment } from "../../services/assignments.api";


const AssignmentsList = () => {
  const { assignments, loading, error, deleteAssignment } = useAssignments();

  return (
    <div className="p-4">
      <Link
        to="/dashboard/assignments/create"
        className="mt-3 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md active:scale-95 transition-transform"
      >
        Crear Designación
      </Link>
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
            {assignments?.length ? (
              assignments.map((assignment) => (
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
                      <Link
                        to={`/dashboard/assignments/${assignment._id}/edit`}
                        className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md active:scale-95 transition-transform"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => deleteAssignment(assignment._id)}
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
                <td colSpan="9" className="px-6 py-8 text-center text-sm text-gray-500">No hay designaciones</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AssignmentsList