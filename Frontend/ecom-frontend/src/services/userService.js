import api from "./api";

// ==========================================
// GET ALL USERS
// ==========================================

const getAllUsers = async () => {
  const response = await api.get(
    "/api/users"
  );

  return response.data;
};

// ==========================================
// GET USER BY ID
// ==========================================

const getUserById = async (id) => {
  const response = await api.get(
    `/api/users/${id}`
  );

  return response.data;
};

// ==========================================
// CREATE USER
// ==========================================

const createUser = async (user) => {
  const response = await api.post(
    "/api/users",
    user
  );

  return response.data;
};

// Alias
const registerUser = createUser;

// ==========================================
// UPDATE USER
// ==========================================

const updateUser = async (id, user) => {
  const response = await api.put(
    `/api/users/${id}`,
    user
  );

  return response.data;
};

// ==========================================
// DELETE USER
// ==========================================

const deleteUser = async (id) => {
  const response = await api.delete(
    `/api/users/${id}`
  );

  return response.data;
};

const userService = {
  getAllUsers,
  getUserById,
  createUser,
  registerUser,
  updateUser,
  deleteUser,
};

export default userService;