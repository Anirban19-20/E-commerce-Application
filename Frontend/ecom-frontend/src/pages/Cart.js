import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import cartService from "../services/cartService";

const Cart = () => {
  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState(null);

  const navigate = useNavigate();

  const userId =
    localStorage.getItem("userId");

  // ==========================================
  // LOAD CART
  // ==========================================

  const loadCart = useCallback(
    async () => {
      if (!userId) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      try {
        const data =
          await cartService.getCart(
            userId
          );

        if (!Array.isArray(data)) {
          console.error(
            "Invalid cart response:",
            data
          );

          setCartItems([]);

          return;
        }

        const formatted = data.map(
          (item) => ({
            id: item.product?.id,

            name:
              item.product?.name || "",

            price: Number(
              item.product?.price || 0
            ),

            category:
              item.product?.category?.name ||
              item.product?.category ||
              "",

            description:
              item.product?.description ||
              "",

            imageUrl:
              item.product?.imageUrl || "",

            quantity: Number(
              item.quantity || 1
            ),
          })
        );

        setCartItems(formatted);
      } catch (error) {
        console.error(
          "Failed to load cart:",
          error
        );

        setCartItems([]);
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = async (
    productId
  ) => {
    const item = cartItems.find(
      (cartItem) =>
        cartItem.id === productId
    );

    if (
      !item ||
      item.quantity >= 10
    ) {
      return;
    }

    try {
      setUpdatingId(productId);

      await cartService.setQuantity(
        userId,
        productId,
        item.quantity + 1
      );

      await loadCart();
    } catch (error) {
      console.error(
        "Increase quantity failed:",
        error
      );

      alert(
        "Failed to update quantity"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = async (
    productId
  ) => {
    const item = cartItems.find(
      (cartItem) =>
        cartItem.id === productId
    );

    if (!item) {
      return;
    }

    try {
      setUpdatingId(productId);

      if (item.quantity <= 1) {
        await cartService.removeFromCart(
          userId,
          productId
        );
      } else {
        await cartService.setQuantity(
          userId,
          productId,
          item.quantity - 1
        );
      }

      await loadCart();
    } catch (error) {
      console.error(
        "Decrease quantity failed:",
        error
      );

      alert(
        "Failed to update quantity"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // REMOVE ITEM
  // ==========================================

  const removeItem = async (
    productId
  ) => {
    try {
      setUpdatingId(productId);

      await cartService.removeFromCart(
        userId,
        productId
      );

      await loadCart();
    } catch (error) {
      console.error(
        "Remove failed:",
        error
      );

      alert(
        "Failed to remove product"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // TOTALS
  // ==========================================

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.12;

  const platformFee =
    cartItems.length > 0 ? 10 : 0;

  const totalAmount =
    subtotal + gst + platformFee;

  const totalItems =
    cartItems.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  const getDeliveryDate = () => {
    const date = new Date();

    date.setDate(date.getDate() + 5);

    return date.toLocaleDateString(
      "en-IN",
      {
        weekday: "short",
        day: "numeric",
        month: "short",
      }
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!userId) {
    return (
      <div className="container mt-5 text-center">
        <h2>Please Login</h2>

        <p className="text-muted">
          Login to view your shopping
          cart.
        </p>

        <button
          className="btn btn-primary"
          onClick={() =>
            navigate("/login")
          }
        >
          Login
        </button>
      </div>
    );
  }

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Your Cart is Empty</h2>

        <p className="text-muted">
          Add products to continue
          shopping.
        </p>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">
        Shopping Cart
      </h2>

      <div className="row">
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="card mb-4 shadow-sm border-0"
            >
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-3 text-center">
                    <Link
                      to={`/products/${item.id}`}
                    >
                      <img
                        src={item.imageUrl}
                        className="img-fluid rounded"
                        style={{
                          maxHeight:
                            "150px",
                          cursor:
                            "pointer",
                        }}
                        alt={item.name}
                      />
                    </Link>
                  </div>

                  <div className="col-md-5">
                    <h5>
                      {item.name}
                    </h5>

                    <p className="text-muted">
                      {item.category}
                    </p>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        removeItem(
                          item.id
                        )
                      }
                      disabled={
                        updatingId ===
                        item.id
                      }
                    >
                      Remove
                    </button>
                  </div>

                  <div className="col-md-4 text-center">
                    <h5>
                      ₹{item.price}
                    </h5>

                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() =>
                          decreaseQuantity(
                            item.id
                          )
                        }
                        disabled={
                          updatingId ===
                          item.id
                        }
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-outline-success"
                        onClick={() =>
                          increaseQuantity(
                            item.id
                          )
                        }
                        disabled={
                          item.quantity >=
                            10 ||
                          updatingId ===
                            item.id
                        }
                      >
                        +
                      </button>
                    </div>

                    <h6 className="mt-2">
                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(2)}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card shadow border-0 p-3">
            <h4>
              Order Summary
            </h4>

            <div className="d-flex justify-content-between">
              <span>Items</span>

              <strong>
                {totalItems}
              </strong>
            </div>

            <div className="d-flex justify-content-between">
              <span>Subtotal</span>

              <strong>
                ₹{subtotal.toFixed(2)}
              </strong>
            </div>

            <div className="d-flex justify-content-between">
              <span>
                GST (12%)
              </span>

              <strong>
                ₹{gst.toFixed(2)}
              </strong>
            </div>

            <div className="d-flex justify-content-between">
              <span>
                Platform Fee
              </span>

              <strong>
                ₹{platformFee}
              </strong>
            </div>

            <div className="d-flex justify-content-between">
              <span>
                Delivery By
              </span>

              <strong>
                {getDeliveryDate()}
              </strong>
            </div>

            <hr />

            <div className="d-flex justify-content-between">
              <h5>Total</h5>

              <h5>
                ₹
                {totalAmount.toFixed(
                  2
                )}
              </h5>
            </div>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={() =>
                navigate(
                  "/checkout"
                )
              }
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;