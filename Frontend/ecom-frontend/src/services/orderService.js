import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

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

const getOrdersByUser = (userId) => {
  return axios.get(`${API_URL}/user/${userId}`);
};

export default {
  createOrder,
  getOrdersByUser,
};