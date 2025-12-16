import {
  getAllMatches,
  getMatchById as getMatchByIdApi,
  createMatch as createMatchApi,
  updateMatch as updateMatchApi,
  deleteMatch as deleteMatchApi,
} from "../services/matches.api";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const useMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatches = async () => {
      try {
        const res = await getAllMatches();
        setMatches(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

  const getMatchById = useCallback(async (id) => {
    try {
      const res = await getMatchByIdApi(id);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  //crear partido
  const createMatch = async (matchData) => {
      const res = await createMatchApi(matchData);
      toast.success("Partido creado");
      await fetchMatches();
  }

  //editar partido
  const updateMatch = async (id, matchData) => {
    await updateMatchApi(id, matchData)
    toast.success("Partido actualizado")
    await fetchMatches()
  }

  //eliminar partido
  const deleteMatch = async (id) => {
  const confirm = await Swal.fire({
    title: "¿Eliminar Partido?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  });

  if (confirm.isConfirmed) {
    await deleteMatchApi(id);
    setMatches((prev) => prev.filter((m) => m._id !== id));
    toast.success("Eliminado correctamente");
  }
};


  useEffect(() => {
    fetchMatches();
  }, []);

  return { matches, loading, error, getMatchById, createMatch, updateMatch, deleteMatch };
};
