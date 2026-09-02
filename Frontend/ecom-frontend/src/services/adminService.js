import api from "./api";

// ==========================================
// DASHBOARD
// ==========================================

const getDashboard = async () => {
  const response = await api.get(
    "/api/admin/dashboard"
  );

  return response.data;
};

// ==========================================
// USERS
// ==========================================

const getUsers = async () => {
  const response = await api.get(
    "/api/admin/users"
  );

  return response.data;
};

const deleteUser = async (userId) => {
  const response = await api.delete(
    `/api/admin/users/${userId}`
  );

  return response.data;
};

// ==========================================
// PRODUCTS
// ==========================================

const getProducts = async () => {
  const response = await api.get(
    "/api/products"
  );

  return response.data;
};

const getProductById = async (id) => {
  const response = await api.get(
    `/api/products/${id}`
  );

  return response.data;
};

const createProduct = async (product) => {
  const response = await api.post(
    "/api/products",
    product
  );

  return response.data;
};

const updateProduct = async (
  id,
  product
) => {
  const response = await api.put(
    `/api/products/${id}`,
    product
  );

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await api.delete(
    `/api/products/${id}`
  );

  return response.data;
};

// ==========================================
// ORDERS
// ==========================================

const getOrders = async () => {
  const response = await api.get(
    "/api/orders/admin"
  );

  return response.data;
};

const updateOrderStatus = async (
  orderId,
  status
) => {
  const response = await api.post(
    `/api/orders/${orderId}/status/${status}`
  );

  return response.data;
};

const adminService = {
  getDashboard,

  getUsers,
  deleteUser,

  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,

  getOrders,
  updateOrderStatus,
};

export default adminService;