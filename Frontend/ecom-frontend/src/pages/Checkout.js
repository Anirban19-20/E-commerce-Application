import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import paymentService from "../services/paymentService";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    console.log("Logged User ID:", userId);

    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(
          "https://e-commerce-application-production-fc90.up.railway.app/api/cart",
          {
            method: "GET",
            headers: {
              "X-User-ID": userId,
            },
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Cart API Error:", errorText);
          setCartItems([]);
          return;
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("Invalid cart response:", data);
          setCartItems([]);
          return;
        }

        const formattedCart = data.map((item) => ({
          id: item.product?.id,
          name: item.product?.name,
          price: Number(item.product?.price || 0),
          quantity: Number(item.quantity || 1),
        }));

        setCartItems(formattedCart);
      } catch (error) {
        console.error("Cart load failed:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.12;
  const totalAmount = subtotal + gst;

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const existingScript = document.getElementById("razorpay-sdk");

      if (existingScript) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.id = "razorpay-sdk";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const createNexaBuyOrder = async () => {
    try {
      const res = await fetch(
        "https://e-commerce-application-production-fc90.up.railway.app/api/orders",
        {
          method: "POST",
          headers: {
            "X-User-ID": userId,
          },
        }
      );

      const text = await res.text();

      console.log("Order Status:", res.status);
      console.log("Order Response:", text);

      if (!res.ok) {
        throw new Error(text || "Order creation failed");
      }

      return text ? JSON.parse(text) : {};
    } catch (error) {
      console.error("Order Creation Error:", error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!userId) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const sdkLoaded = await loadRazorpay();

    if (!sdkLoaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    try {
      const response = await paymentService.createOrder(
        Math.round(totalAmount)
      );

      const data = response.data;

      const options = {
        key: "rzp_test_T2cso3lMvXCgjI",
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,

        name: "NexaBuy",
        description: "Order Payment",

        handler: async (paymentResponse) => {
          try {
            console.log(
              "Payment Successful:",
              paymentResponse
            );

            await createNexaBuyOrder();

            alert("Order placed successfully!");
            navigate("/orders");
          } catch (error) {
            console.error(error);

            alert(
              "Payment successful but order creation failed."
            );
          }
        },

        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#3399cc",
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded properly");
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment initialization failed");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>

      {!userId ? (
        <div className="alert alert-warning mt-3">
          Please login to continue.
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center mt-4">
          <h5>Your cart is empty</h5>

          <button
            className="btn btn-primary mt-2"
            onClick={() => navigate("/cart")}
          >
            Go to Cart
          </button>
        </div>
      ) : (
        <div className="card p-4 mt-3 shadow">
          <h4 className="mb-3">Order Summary</h4>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between mb-2"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <hr />

          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <strong>₹{subtotal.toFixed(2)}</strong>
          </div>

          <div className="d-flex justify-content-between">
            <span>GST (12%)</span>
            <strong>₹{gst.toFixed(2)}</strong>
          </div>

          <hr />

          <div className="d-flex justify-content-between">
            <h5>Total</h5>
            <h5>₹{totalAmount.toFixed(2)}</h5>
          </div>

          <div className="text-center">
            <button
              className="btn btn-success mt-4 px-4"
              onClick={handlePayment}
            >
              Pay with Razorpay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;