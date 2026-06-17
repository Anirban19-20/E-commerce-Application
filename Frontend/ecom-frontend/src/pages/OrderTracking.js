import React, {
  useEffect,
  useState
} from "react";

import { useParams } from "react-router-dom";

import orderService
from "../services/orderService";

const OrderTracking = () => {

  const { id } = useParams();

  const [order, setOrder] =
      useState(null);

  useEffect(() => {

    orderService
      .getOrderById(id)
      .then((res) => {
        setOrder(res.data);
      });

  }, [id]);

  if (!order) {
    return <h3>Loading...</h3>;
  }

  const steps = [
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED"
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

      <div className="row mt-5">

        {steps.map((step, index) => (

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

        ))}

      </div>

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