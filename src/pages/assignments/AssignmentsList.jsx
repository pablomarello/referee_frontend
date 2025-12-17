import { Link } from "react-router-dom";
import { useAssignments } from "../../hooks/useAssignments";
import { deleteAssignment } from "../../services/assignments.api";
import { ClipLoader } from "react-spinners";
import CreateButton from '../../components/common/CreateButton'
import Can from '../../components/common/Can'


const AssignmentsList = () => {
  const { assignments, loading, error, deleteAssignment } = useAssignments();

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
            {/* Cuerpo del silbato */}
            <path d="M3 12a5 5 0 0 1 5-5h5a4 4 0 0 1 0 8H8a5 5 0 0 1-5-5z" />

            {/* Orificio */}
            <circle cx="15" cy="11" r="1.5" />

            {/* Boquilla */}
            <path d="M8 7V5a2 2 0 0 1 2-2h2" />

            {/* Argolla */}
            <circle cx="20" cy="8" r="2" />
          </svg>


          <div>
            <h1 className="text-2xl font-bold text-gray-900">Designaciones</h1>
            <p className="text-sm text-gray-600">Gestiona las designaciones arbitrales</p>
          </div>

        </div>

        <CreateButton
          to="/dashboard/assignments/create"
          label="Crear Designación"
          permission="create:designaciones"
        />

        {/* <Link
          to="/dashboard/assignments/create"
          className="mt-3 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md active:scale-95 transition-transform"
        >
          Crear Designación
        </Link> */}
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
                        <Can permission="read:designaciones">
                          <Link
                          to={`/dashboard/assignments/${assignment._id}`}
                          className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md active:scale-95 transition-transform"
                        >
                          Ver
                        </Link>
                        </Can>
                        <Can permission="update:assignments">
                          <Link
                          to={`/dashboard/assignments/${assignment._id}/edit`}
                          className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md active:scale-95 transition-transform"
                        >
                          Editar
                        </Link>
                        </Can>
                        <Can permission="delete:assignments">
                        <button
                          onClick={() => deleteAssignment(assignment._id)}
                          className="mt-3 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md active:scale-95 transition-transform"
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
                  <td colSpan="9" className="px-6 py-8 text-center text-sm text-gray-500">No hay designaciones</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>

  )
}

export default AssignmentsList