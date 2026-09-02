import React, {
  useEffect,
  useState,
} from "react";

import AdminNavbar from "../components/AdminNavbar";

import adminService from "../services/adminService";

const AdminOrders = () => {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [updatingId,
    setUpdatingId] =
    useState(null);

  // ==========================================
  // LOAD ORDERS
  // ==========================================

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data =
        await adminService.getOrders();

      setOrders(
        Array.isArray(data)
          ? data
          : []
      );

      setError("");
    } catch (error) {
      console.error(
        "Orders load failed:",
        error
      );

      setError(
        "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ==========================================
  // STATUS
  // ==========================================

  const handleStatusChange =
    async (
      orderId,
      status
    ) => {
      try {
        setUpdatingId(
          orderId
        );

        await adminService.updateOrderStatus(
          orderId,
          status
        );

        await loadOrders();
      } catch (error) {
        console.error(
          "Status update failed:",
          error
        );

        alert(
          "Failed to update order status"
        );
      } finally {
        setUpdatingId(null);
      }
    };

  return (
    <>
      <AdminNavbar />

      <div className="container py-5">
        <div className="mb-4">
          <h2 className="fw-bold">
            Order Management
          </h2>

          <p className="text-muted">
            View customer orders and
            update delivery status.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" />
          </div>
        ) : orders.length === 0 ? (
          <div className="alert alert-info">
            No orders found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Order</th>

                  <th>Date</th>

                  <th>Items</th>

                  <th>Total</th>

                  <th>Status</th>

                  <th>Update</th>
                </tr>
              </thead>

              <tbody>
                {orders.map(
                  (order) => (
                    <tr
                      key={
                        order.id
                      }
                    >
                      <td>
                        #
                        {order.id}
                      </td>

                      <td>
                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleString()
                          : "-"}
                      </td>

                      <td>
                        {order.items
                          ?.length ||
                          0}
                      </td>

                      <td>
                        ₹
                        {Number(
                          order.totalAmount ||
                            0
                        ).toFixed(
                          2
                        )}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            order.status ===
                            "DELIVERED"
                              ? "bg-success"
                              : order.status ===
                                "CANCELLED"
                              ? "bg-danger"
                              : order.status ===
                                "SHIPPED"
                              ? "bg-primary"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {
                            order.status
                          }
                        </span>
                      </td>

                      <td>
                        <select
                          className="form-select"
                          value={
                            order.status
                          }
                          disabled={
                            updatingId ===
                            order.id
                          }
                          onChange={(
                            e
                          ) =>
                            handleStatusChange(
                              order.id,
                              e.target
                                .value
                            )
                          }
                        >
                          <option value="PENDING">
                            PENDING
                          </option>

                          <option value="CONFIRMED">
                            CONFIRMED
                          </option>

                          <option value="SHIPPED">
                            SHIPPED
                          </option>

                          <option value="DELIVERED">
                            DELIVERED
                          </option>

                          <option value="CANCELLED">
                            CANCELLED
                          </option>
                        </select>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminOrders;