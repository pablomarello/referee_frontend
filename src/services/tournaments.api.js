import api from "./api";

export const getAllTournaments = () => api.get("/tournaments");
export const getTournamentById = (id) => api.get(`/tournaments/${id}`);
export const createTournament =  (tournamentData) => api.post("/tournaments", tournamentData);
export const updateTournament = (id, tournamentData) => api.patch(`/tournaments/${id}`, tournamentData);
export const deleteTournament = (id) => api.delete(`/tournaments/${id}`);