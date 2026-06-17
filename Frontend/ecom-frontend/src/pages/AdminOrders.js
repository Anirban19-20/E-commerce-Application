import React, {
  useEffect,
  useState
} from "react";

import orderService
from "../services/orderService";

const AdminOrders = () => {

  const [orders, setOrders] =
      useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    orderService
      .getAllOrders()
      .then((res) => {
        setOrders(res.data);
      });
  };

  const handleStatusChange = (
    orderId,
    status
  ) => {

    orderService
      .updateOrderStatus(
        orderId,
        status
      )
      .then(() => {
        loadOrders();
      });
  };

  return (
    <div className="container py-5">

      <h2 className="mb-4">
        Admin Orders
      </h2>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>

          {orders.map(order => (

            <tr key={order.id}>

              <td>{order.id}</td>

              <td>
                ₹{order.totalAmount}
              </td>

              <td>
                {order.status}
              </td>

              <td>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order.id,
                      e.target.value
                    )
                  }
                  className="form-select"
                >
                  <option>
                    PENDING
                  </option>

                  <option>
                    CONFIRMED
                  </option>

                  <option>
                    SHIPPED
                  </option>

                  <option>
                    DELIVERED
                  </option>

                  <option>
                    CANCELLED
                  </option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default AdminOrders;