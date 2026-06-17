import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-warning text-dark";

      case "CONFIRMED":
        return "bg-info";

      case "SHIPPED":
        return "bg-primary";

      case "DELIVERED":
        return "bg-success";

      case "CANCELLED":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  const getProgress = (status) => {
    switch (status) {
      case "PENDING":
        return 25;

      case "CONFIRMED":
        return 50;

      case "SHIPPED":
        return 75;

      case "DELIVERED":
        return 100;

      default:
        return 0;
    }
  };

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
              className={`badge ${getStatusBadge(
                order.status
              )}`}
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

            {/* Progress Bar */}

            {order.status !== "CANCELLED" && (
              <>
                <div className="progress mb-3">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${getProgress(
                        order.status
                      )}%`,
                    }}
                  >
                    {order.status}
                  </div>
                </div>

                <div className="d-flex justify-content-between small text-muted mb-4">
                  <span>PENDING</span>
                  <span>CONFIRMED</span>
                  <span>SHIPPED</span>
                  <span>DELIVERED</span>
                </div>
              </>
            )}

            {order.status === "CANCELLED" && (
              <div className="alert alert-danger">
                This order has been cancelled.
              </div>
            )}

            <h5 className="mb-3">Order Items</h5>

            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {order.items?.map((item) => (
                    <tr key={item.id}>
                      <td width="100">
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="img-fluid"
                          style={{
                            height: "70px",
                            objectFit: "contain",
                          }}
                        />
                      </td>

                      <td>
                        {item.productName}
                      </td>

                      <td>
                        {item.quantity}
                      </td>

                      <td>
                        ₹{item.price}
                      </td>

                      <td>
                        ₹{item.subTotal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 text-end">
              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  navigate(
                    `/orders/${order.id}`
                  )
                }
              >
                Track Order
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;