import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-application-production-fc90.up.railway.app"
});

export default api;