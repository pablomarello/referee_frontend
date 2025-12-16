import { useNavigate } from "react-router-dom"
import { useAssignments } from "../../hooks/useAssignments"
import AssignmentForm from "./AssignmentForm"
import { ClipLoader } from "react-spinners"


const AssignmentCreate = () => {
  const navigate = useNavigate()
  const { createAssignment, loading } = useAssignments()

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

  const handleCreateAssignment = async (data) => {
    try {
     
      await createAssignment({
        ...data,
        date: new Date(data.date),
      })

      navigate('/dashboard/assignments')
    } catch (error) {
      console.error('Error al crear al usuario:', error)
    }
  }
  return (
    <AssignmentForm
      onSubmit={handleCreateAssignment}
      onCancel={() => navigate('/dashboard/assignments')}
    />
  )
}

export default AssignmentCreate