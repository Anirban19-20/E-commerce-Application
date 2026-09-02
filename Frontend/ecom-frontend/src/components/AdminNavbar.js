import React from "react";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

const AdminNavbar = () => {
  const navigate =
    useNavigate();

  const logout = () => {
    localStorage.clear();

    navigate("/login");

    window.location.reload();
  };

  const getLinkClass = ({
    isActive,
  }) =>
    isActive
      ? "nav-link active fw-bold text-warning"
      : "nav-link text-white";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link
          className="navbar-brand fw-bold"
          to="/admin"
        >
          NexaBuy Admin
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse"
          id="adminNavbar"
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                to="/admin"
                end
                className={
                  getLinkClass
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin/products"
                className={
                  getLinkClass
                }
              >
                Products
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin/orders"
                className={
                  getLinkClass
                }
              >
                Orders
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/admin/users"
                className={
                  getLinkClass
                }
              >
                Users
              </NavLink>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <Link
              to="/"
              className="btn btn-outline-light btn-sm"
            >
              Store
            </Link>

            <button
              className="btn btn-danger btn-sm"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;