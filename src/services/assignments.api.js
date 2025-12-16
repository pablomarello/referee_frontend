import api from "./api";

export const getAllAssignments = () => api.get("/assignments");
export const getAssignmentsById = (id) => api.get(`/assignments/${id}`);
export const createAssignment =  (assignmentData) => api.post("/assignments", assignmentData);
export const updateAssignment = (id, assignmentData) => api.patch(`/assignments/${id}`, assignmentData);
export const deleteAssignment = (id) => api.delete(`/assignments/${id}`);