import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/userService";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "CUSTOMER",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await userService.createUser(formData);

      setMessage("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container py-5"
      style={{ maxWidth: "850px" }}
    >
      <div className="card shadow border-0">
        <div className="card-body p-4">

          <div className="text-center mb-4">
            <h2 className="fw-bold">Create Account</h2>
            <p className="text-muted">
              Join NexaBuy and start shopping
            </p>
          </div>

          {message && (
            <div className="alert alert-info">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <h5 className="mb-3">Personal Information</h5>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              

            </div>

            <hr />

            <h5 className="mb-3">
              Address Information
            </h5>

            <div className="row">

              <div className="col-md-12 mb-3">
                <label className="form-label">
                  Street
                </label>

                <input
                  type="text"
                  name="street"
                  className="form-control"
                  value={formData.address.street}
                  onChange={handleAddressChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  className="form-control"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  className="form-control"
                  value={formData.address.country}
                  onChange={handleAddressChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Zip Code
                </label>

                <input
                  type="text"
                  name="zipcode"
                  className="form-control"
                  value={formData.address.zipcode}
                  onChange={handleAddressChange}
                />
              </div>

            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 mt-3"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Register"}
            </button>

          </form>

          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;