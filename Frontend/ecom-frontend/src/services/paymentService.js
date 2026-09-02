import api from "./api";

export const createPaymentOrder = async (amount) => {
    const response = await api.post(
        "/api/payment/create-order",
        {
            amount
        }
    );

    return response.data;
};