import axios from "axios";


export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const loginUser = (credentials) => api.post("/login", credentials);


export default api;
