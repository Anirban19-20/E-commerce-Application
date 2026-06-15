import axios from "axios";

const API_URL = "https://e-commerce-application-production-fc90.up.railway.app/api/users";

// Get all users
const getAllUsers = () => {
  return axios.get(API_URL);
};

// Get user by ID
const getUserById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Register new user
const registerUser = (user) => {
  return axios.post(API_URL, user);
};

// Update user
const updateUser = (id, user) => {
  return axios.put(`${API_URL}/${id}`, user);
};

// Delete user
const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

const userService = {
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
};

export default userService;