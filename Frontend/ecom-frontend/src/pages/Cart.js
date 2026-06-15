import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/cart", {
          method: "GET",
          headers: {
            "X-User-ID": userId,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("Invalid cart response:", data);
          setCartItems([]);
          return;
        }

        const formatted = data.map((item) => ({
          id: item.product?.id,
          name: item.product?.name,
          price: item.product?.price || 0,
          category: item.product?.category || "",
          description: item.product?.description || "",
          imageUrl: item.product?.imageUrl || "",
          quantity: item.quantity || 1,
        }));

        setCartItems(formatted);
      } catch (err) {
        console.error("Failed to load cart", err);
        setCartItems([]);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const increaseQuantity = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id && item.quantity < 10
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updated);
  };

  const decreaseQuantity = async (id) => {
    const item = cartItems.find((i) => i.id === id);

    if (!item) return;

    if (item.quantity === 1) {
      await removeItem(id);
      return;
    }

    const updated = cartItems.map((i) =>
      i.id === id
        ? { ...i, quantity: i.quantity - 1 }
        : i
    );

    setCartItems(updated);
  };

  const removeItem = async (productId) => {
    try {
      await fetch(
        `http://localhost:8080/api/cart/items/${productId}`,
        {
          method: "DELETE",
          headers: {
            "X-User-ID": userId,
          },
        }
      );

      setCartItems((prev) =>
        prev.filter((item) => item.id !== productId)
      );
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.12;
  const platformFee = cartItems.length > 0 ? 10 : 0;
  const totalAmount = subtotal + gst + platformFee;

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const getDeliveryDate = () => {
    const date = new Date();

    date.setDate(date.getDate() + 5);

    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Your Cart is Empty</h2>
        <p className="text-muted">
          Add products to continue shopping.
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
      <h2 className="fw-bold mb-4">Shopping Cart</h2>

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
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.imageUrl}
                        className="img-fluid rounded"
                        style={{
                          maxHeight: "150px",
                          cursor: "pointer",
                        }}
                        alt={item.name}
                      />
                    </Link>
                  </div>

                  <div className="col-md-5">
                    <h5>{item.name}</h5>

                    <p className="text-muted">
                      {item.category}
                    </p>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="col-md-4 text-center">
                    <h5>₹{item.price}</h5>

                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        className="btn btn-outline-success"
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        disabled={item.quantity >= 10}
                      >
                        +
                      </button>
                    </div>

                    <h6 className="mt-2">
                      ₹{(
                        item.price * item.quantity
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
            <h4>Order Summary</h4>

            <div className="d-flex justify-content-between">
              <span>Items</span>
              <strong>{totalItems}</strong>
            </div>

            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <strong>
                ₹{subtotal.toFixed(2)}
              </strong>
            </div>

            <div className="d-flex justify-content-between">
              <span>GST (12%)</span>
              <strong>
                ₹{gst.toFixed(2)}
              </strong>
            </div>

            <div className="d-flex justify-content-between">
              <span>Platform Fee</span>
              <strong>₹{platformFee}</strong>
            </div>

            <div className="d-flex justify-content-between">
              <span>Delivery By</span>
              <strong>{getDeliveryDate()}</strong>
            </div>

            <hr />

            <div className="d-flex justify-content-between">
              <h5>Total</h5>
              <h5>
                ₹{totalAmount.toFixed(2)}
              </h5>
            </div>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={handleCheckout}
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