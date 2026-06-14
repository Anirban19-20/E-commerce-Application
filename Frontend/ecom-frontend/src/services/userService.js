import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

const createUser = (userData) => {
  return axios.post(API_URL, userData);
};

const getAllUsers = () => {
  return axios.get(API_URL);
};

const getUserById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const login = (credentials) => {
  return axios.post(
    `${API_URL}/login`,
    credentials
  );
};

const userService = {
  createUser,
  getAllUsers,
  getUserById,
  login,
};

export default userService;