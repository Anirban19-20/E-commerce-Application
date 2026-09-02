import axios from "axios";

const API_URL =
"https://nexabuy-backend.onrender.com/api/payment";

const createOrder = (amount) => {
  return axios.post(
    `${API_URL}/create-order`,
    {
      amount,
    }
  );
};

export default {
  createOrder,
};