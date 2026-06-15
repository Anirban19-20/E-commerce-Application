import api from "./api";

const productService = {
  getAllProducts: () => api.get("/api/products"),

  getProductById: (id) =>
    api.get(`/api/products/${id}`)
};

export default productService;