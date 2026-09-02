import React, {
  useEffect,
  useState,
} from "react";

import AdminNavbar from "../components/AdminNavbar";

import adminService from "../services/adminService";

const AdminDashboard = () => {
  const [stats, setStats] =
    useState({
      totalProducts: 0,
      totalUsers: 0,
      totalOrders: 0,
      totalRevenue: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadDashboard =
      async () => {
        try {
          const data =
            await adminService.getDashboard();

          setStats(data);

          setError("");
        } catch (error) {
          console.error(
            "Dashboard load error:",
            error
          );

          setError(
            "Failed to load dashboard data"
          );
        } finally {
          setLoading(false);
        }
      };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <>
        <AdminNavbar />

        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" />
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="container py-5">
        <div className="mb-5">
          <h2 className="fw-bold">
            Admin Dashboard
          </h2>

          <p className="text-muted">
            Overview of your NexaBuy
            store.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center py-4">
                <h5 className="text-muted">
                  Products
                </h5>

                <h1 className="fw-bold text-primary">
                  {
                    stats.totalProducts
                  }
                </h1>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center py-4">
                <h5 className="text-muted">
                  Users
                </h5>

                <h1 className="fw-bold text-success">
                  {stats.totalUsers}
                </h1>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center py-4">
                <h5 className="text-muted">
                  Orders
                </h5>

                <h1 className="fw-bold text-warning">
                  {stats.totalOrders}
                </h1>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center py-4">
                <h5 className="text-muted">
                  Revenue
                </h5>

                <h3 className="fw-bold text-danger">
                  ₹
                  {Number(
                    stats.totalRevenue ||
                      0
                  ).toFixed(2)}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm mt-5">
          <div className="card-body p-4">
            <h4 className="fw-bold">
              Admin Controls
            </h4>

            <p className="text-muted mb-0">
              Manage products, users,
              customer orders and order
              statuses from the admin
              navigation bar.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;