import api from "./api";

// ==========================================
// GET ALL PRODUCTS
// ==========================================

const getAllProducts = async () => {
  const response = await api.get(
    "/api/products"
  );

  return response.data;
};

// ==========================================
// GET PRODUCT BY ID
// ==========================================

const getProductById = async (id) => {
  const response = await api.get(
    `/api/products/${id}`
  );

  return response.data;
};

const productService = {
  getAllProducts,
  getProductById,
};

export {
  getAllProducts,
  getProductById,
};

export default productService;