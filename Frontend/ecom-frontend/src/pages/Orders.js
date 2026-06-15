import React, { useEffect, useState } from "react";
import orderService from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrdersByUser(userId);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="container py-5">
        <h3>Loading Orders...</h3>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>No Orders Found</h2>

        <p className="text-muted">
          You haven't placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="card shadow-sm border-0 mb-4"
        >
          <div className="card-header d-flex justify-content-between align-items-center">
            <strong>Order #{order.id}</strong>

            <span
              className={`badge ${
                order.status === "DELIVERED"
                  ? "bg-success"
                  : order.status === "PENDING"
                  ? "bg-warning text-dark"
                  : "bg-primary"
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <p>
                  <strong>Total Amount:</strong> ₹
                  {order.totalAmount}
                </p>
              </div>

              <div className="col-md-6 text-md-end">
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            <h5 className="mb-3">Order Items</h5>

            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Product ID</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {order.items?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.productId}</td>

                      <td>{item.quantity}</td>

                      <td>₹{item.price}</td>

                      <td>₹{item.subTotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;