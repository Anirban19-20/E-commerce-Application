import axios from "axios";

const API_URL =
  "https://e-commerce-application-production-fc90.up.railway.app/api/orders";

// Create Order
const createOrder = (userId) => {
  return axios.post(
    API_URL,
    {},
    {
      headers: {
        "X-User-ID": userId,
      },
    }
  );
};

// Get orders of a specific user
const getOrdersByUser = (userId) => {
  return axios.get(`${API_URL}/user/${userId}`);
};

// Get single order by ID (Tracking Page)
const getOrderById = (orderId) => {
  return axios.get(`${API_URL}/${orderId}`);
};

// Get all orders (Admin Dashboard)
const getAllOrders = () => {
  return axios.get(`${API_URL}/admin`);
};

// Update order status (Admin Dashboard)
const updateOrderStatus = (orderId, status) => {
  return axios.post(
    `${API_URL}/${orderId}/status/${status}`
  );
};

export default {
  createOrder,
  getOrdersByUser,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};