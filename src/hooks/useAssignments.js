import { 
  getAllAssignments,
  getAssignmentsById as getAssignmentsByIdApi, 
  createAssignment as createAssignmentsApi ,
  updateAssignment as updateAssignmentsApi,
  deleteAssignment as deleteAssignmentsApi 
} from "../services/assignments.api";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const useAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAssignments = async () => {
        try {
          const res = await getAllAssignments();
          setAssignments(res.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

  const getAssignmentById = useCallback(async (id) => {
      try {
        const res = await getAssignmentsByIdApi(id);
        return res.data;
      } catch (err) {
        setError(err);
        throw err;
      }
    }, []);

  //crear designacion
    const createAssignment = async (assignmentData) => {
        const res = await createAssignmentsApi(assignmentData);
        toast.success("Designación creada");
        await fetchAssignments();
    }

  //editar designacion
    const updateAssignment = async (id, assignmentData) => {
      const res = await updateAssignmentsApi(id, assignmentData);
      toast.success("Designación actualizada");
      await fetchAssignments();
    }

  //eliminar designacion
    const deleteAssignment = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar Designación?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
  
    if (confirm.isConfirmed) {
      await deleteAssignmentsApi(id);
      setAssignments((prev) => prev.filter((d) => d._id !== id));
      toast.success("Eliminado correctamente");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);
  
   return { assignments, loading, error, getAssignmentById, createAssignment, updateAssignment, deleteAssignment };
}