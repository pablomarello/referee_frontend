import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAssignments } from '../../hooks/useAssignments'
import AssignmentForm from './AssignmentForm'

const AsignmentEdit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { updateAssignment, getAssignmentById } = useAssignments()
  const [assignmentData, setAssignmentData] = useState(null)

  useEffect(() => {
    const fetchAssignmentData = async () => {
      const data = await getAssignmentById(id)
      setAssignmentData(data)
    }
    fetchAssignmentData()
  }), [id, getAssignmentById]

  const handleEditAssignment = async (data) => {
    try {
      await updateAssignment(id, data) // ✅ ID + DATA
      navigate('/dashboard/assignments')
    } catch (error) {
      console.error('Error al editar la designación:', error)
    }
  }

  // ⛔ No renderizar el form hasta tener datos
  if (!assignmentData) {
    return <p className="p-6">Cargando designación...</p>
  }

  return (
    <AssignmentForm
      onSubmit={handleEditAssignment}
      onCancel={() => navigate('/dashboard/assignments')}
      initialValues={assignmentData}
    />
  )
}

export default AsignmentEdit