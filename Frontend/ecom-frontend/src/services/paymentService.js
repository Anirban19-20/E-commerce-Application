import api from "./api";

// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

const createPaymentOrder = async (amount) => {
  const response = await api.post(
    "/api/payment/create-order",
    {
      amount,
    }
  );

  return response.data;
};

const paymentService = {
  createPaymentOrder,
};

export {
  createPaymentOrder,
};

export default paymentService;