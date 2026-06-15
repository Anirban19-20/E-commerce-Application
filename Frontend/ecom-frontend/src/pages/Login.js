import React, { useState } from "react";
import { Link } from "react-router-dom";
import userService from "../services/userService";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await userService.getAllUsers();

      const user = response.data.find(
        (u) =>
          u.email?.trim().toLowerCase() ===
            formData.email.trim().toLowerCase() &&
          u.password?.trim() === formData.password.trim()
      );

      if (!user) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      // Save login data
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", user.id);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect and refresh navbar
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        className="card shadow border-0"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "15px",
        }}
      >
        <div className="card-body p-4">

          <div className="text-center mb-4">
            <h2 className="fw-bold">Welcome Back</h2>
            <p className="text-muted">
              Sign in to your NexaBuy account
            </p>
          </div>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <hr />

          <div className="text-center">
            <span className="text-muted">
              Don't have an account?
            </span>

            <div className="mt-2">
              <Link
                to="/register"
                className="btn btn-outline-primary btn-sm"
              >
                Register
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;