import {
  getAllTournaments,
  getTournamentById as getTournamentByIdApi,
  createTournament as createTournamentApi,
  updateTournament as updateTournamentApi,
  deleteTournament as deleteTournamentApi,
} from "../services/tournaments.api";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const useTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTournaments = async () => {
    try {
      const res = await getAllTournaments();
      setTournaments(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const getTournamentById = useCallback(async (id) => {
    try {
      const res = await getTournamentByIdApi(id)
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [])

  //crear torneo
  const createTournament = async (tournamentData) => {
    const res = await createTournamentApi(tournamentData)
    toast.success("Torneo creado");
    await fetchTournaments();
  }

  //editar torneo
  const updateTournament = async (id, tournamentData) => {
    await updateTournamentApi(id, tournamentData)
    toast.success("Torneo actualizado");
    await fetchTournaments();
  }

  //eliminar torneo
  const deleteTournament = async (id) => {
    const confirm = await Swal.fire({
        title: "¿Eliminar Torneo?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      });

    if (confirm.isConfirmed) {
      await deleteTournamentApi(id)
      setTournaments(tournaments.filter(t => t._id !== id))
      toast.success("Eliminado correctamente");
    }
  }

  useEffect(() => {
    fetchTournaments();
  }, []);

  return { tournaments, loading, error, getTournamentById, createTournament, updateTournament, deleteTournament };
}