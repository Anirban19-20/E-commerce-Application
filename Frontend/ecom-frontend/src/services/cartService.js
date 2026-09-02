import api from "./api";

const getHeaders = (userId) => ({
  "X-User-ID": userId,
});

// ==========================================
// GET CART
// ==========================================

const getCart = async (userId) => {
  const response = await api.get(
    "/api/cart",
    {
      headers: getHeaders(userId),
    }
  );

  return response.data;
};

// ==========================================
// ADD PRODUCT TO CART
// ==========================================

const addToCart = async (
  userId,
  productId,
  quantity = 1
) => {
  const response = await api.post(
    "/api/cart",
    {
      productId,
      quantity,
    },
    {
      headers: getHeaders(userId),
    }
  );

  return response.data;
};

// ==========================================
// REMOVE PRODUCT FROM CART
// ==========================================

const removeFromCart = async (
  userId,
  productId
) => {
  const response = await api.delete(
    `/api/cart/items/${productId}`,
    {
      headers: getHeaders(userId),
    }
  );

  return response.data;
};

// ==========================================
// CHANGE QUANTITY
// ==========================================

const setQuantity = async (
  userId,
  productId,
  quantity
) => {
  if (quantity <= 0) {
    return removeFromCart(
      userId,
      productId
    );
  }

  await removeFromCart(
    userId,
    productId
  );

  return addToCart(
    userId,
    productId,
    quantity
  );
};

const cartService = {
  getCart,
  addToCart,
  removeFromCart,
  setQuantity,
};

export {
  getCart,
  addToCart,
  removeFromCart,
  setQuantity,
};

export default cartService;