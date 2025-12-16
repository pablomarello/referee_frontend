import api from "./api";

export const getAllMatches = () => api.get("/matches");
export const getMatchById = (id) => api.get(`/matches/${id}`);
export const createMatch =  (matchData) => api.post("/matches", matchData);
export const updateMatch = (id, matchData) => api.patch(`/matches/${id}`, matchData);
export const deleteMatch = (id) => api.delete(`/matches/${id}`);