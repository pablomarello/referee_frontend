import axios from "axios";

 const url = import.meta.env.VITE_URL;

export const api = axios.create({
  baseURL: url,
});

export const loginUser = (credentials) =>
  api.post("/login", credentials);

// 👉 interceptor para agregar el token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // o donde lo guardes
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default api;
