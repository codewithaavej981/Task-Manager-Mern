import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-mern-aysd.onrender.com/api",
});

export default api;