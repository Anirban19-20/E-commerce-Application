import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState(
    new URLSearchParams(location.search).get("search") || ""
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearchTerm(value);

    navigate(`/?search=${encodeURIComponent(value)}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          NexaBuy
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/cart" ? "active" : ""
                }`}
                to="/cart"
              >
                Cart
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/orders" ? "active" : ""
                }`}
                to="/orders"
              >
                Orders
              </Link>
            </li>
          </ul>

          <form
            className="d-flex me-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control"
              type="search"
              placeholder="🔍 Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                width: "280px",
                borderRadius: "25px",
              }}
            />
          </form>

          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-light">
              Login
            </Link>

            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;