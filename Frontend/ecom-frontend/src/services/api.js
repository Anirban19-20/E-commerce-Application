import axios from "axios";

const api = axios.create({
  baseURL: "https://nexabuy-backend.onrender.com"
});

export default api;