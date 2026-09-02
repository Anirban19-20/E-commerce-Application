import React, {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import orderService from "../services/orderService";

const OrderTracking = () => {
  const { id } = useParams();

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data =
          await orderService.getOrderById(
            id
          );

        setOrder(data);
      } catch (error) {
        console.error(
          "Order load failed:",
          error
        );

        setError(
          "Unable to load order."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error ||
            "Order not found"}
        </div>
      </div>
    );
  }

  const steps = [
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
  ];

  const currentStep =
    steps.indexOf(order.status);

  return (
    <div className="container mt-4">
      <h2>
        Order #{order.id}
      </h2>

      <h4>
        Status: {order.status}
      </h4>

      {order.status !==
        "CANCELLED" && (
        <div className="row mt-5">
          {steps.map(
            (step, index) => (
              <div
                key={step}
                className={`col text-center ${
                  index <= currentStep
                    ? "text-success fw-bold"
                    : "text-secondary"
                }`}
              >
                {step}
              </div>
            )
          )}
        </div>
      )}

      {order.status ===
        "CANCELLED" && (
        <div className="alert alert-danger mt-4">
          Order Cancelled
        </div>
      )}
    </div>
  );
};

export default OrderTracking;