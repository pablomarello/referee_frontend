import { useNavigate } from "react-router-dom"
import { useAssignments } from "../../hooks/useAssignments"
import AssignmentForm from "./AssignmentForm"


const AssignmentCreate = () => {
  const navigate = useNavigate()
  const { createAssignment } = useAssignments()

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