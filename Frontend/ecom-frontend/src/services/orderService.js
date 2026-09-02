import api from "./api";

// ==========================================
// CREATE ORDER
// ==========================================

const createOrder = async (userId) => {
  const response = await api.post(
    "/api/orders",
    {},
    {
      headers: {
        "X-User-ID": userId,
      },
    }
  );

  return response.data;
};

// ==========================================
// GET ORDERS BY USER
// ==========================================

const getOrdersByUser = async (userId) => {
  const response = await api.get(
    `/api/orders/user/${userId}`
  );

  return response.data;
};

// ==========================================
// GET ORDER BY ID
// ==========================================

const getOrderById = async (orderId) => {
  const response = await api.get(
    `/api/orders/${orderId}`
  );

  return response.data;
};

// ==========================================
// GET ALL ORDERS - ADMIN
// ==========================================

const getAllOrders = async () => {
  const response = await api.get(
    "/api/orders/admin"
  );

  return response.data;
};

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

const updateOrderStatus = async (
  orderId,
  status
) => {
  const response = await api.post(
    `/api/orders/${orderId}/status/${status}`
  );

  return response.data;
};

const orderService = {
  createOrder,
  getOrdersByUser,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};

export {
  createOrder,
  getOrdersByUser,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};

export default orderService;