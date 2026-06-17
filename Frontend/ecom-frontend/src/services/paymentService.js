import axios from "axios";

const API_URL =
"https://e-commerce-application-production-fc90.up.railway.app/api/payment";

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