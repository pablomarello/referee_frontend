import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAssignments } from '../../hooks/useAssignments';

const AsignmentDetail = () => {
  const { id } = useParams();
  const { getAssignmentById } = useAssignments();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        const fetchAssignment = async () => {
          try {
            const data = await getAssignmentById(id);
            setAssignment(data);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchAssignment();
      }, [id, getAssignmentById])

  if (loading) {
    return <p className="mt-20 text-center text-lg">Cargando Designaciones...</p>;
  }

  if (!assignment) {
    return <p className="mt-20 text-center text-lg text-red-600">Designación no encontrada</p>;
  }

  return (
    <div className="mt-10 text-black p-4 max-w-xl mx-auto">
      <div className="border p-4 rounded shadow bg-white">
        <h3 className="text-xl font-bold mb-4">Descripción de la designación</h3>
        <h4>ID: {assignment._id}</h4>
        <h4>PARTIDO ID: {assignment.match_id}</h4>
        <h4>ARBITRO ID{assignment.referee_id}</h4>
        <h4>ASISTENTE 1 ID: {assignment.assistant1_id}</h4>
        <h4>ASISTENTE 2 ID: {assignment.assistant2_id}</h4>
        <h4>OBSERVACIONES: {assignment.observations}</h4>
        <h4>FECHA DE ASIGNACIÓN: {assignment.assignedAt}</h4>
      </div>
    </div>
  )
}

export default AsignmentDetail