import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        navigate("/login");
        return;
      }

      const response = await userService.getUserById(userId);

      setUser(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container text-center mt-5">
        <h4>User not found</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="card shadow border-0">

        <div className="card-header bg-dark text-white text-center py-4">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            width="100"
            className="mb-3"
          />

          <h3>
            {user.firstName} {user.lastName}
          </h3>

          <p className="mb-0">
            {user.role}
          </p>

        </div>

        <div className="card-body p-4">

          <h4 className="mb-4">
            Personal Information
          </h4>

          <div className="row mb-3">
            <div className="col-md-3 fw-bold">
              First Name
            </div>
            <div className="col-md-9">
              {user.firstName}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3 fw-bold">
              Last Name
            </div>
            <div className="col-md-9">
              {user.lastName}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3 fw-bold">
              Email
            </div>
            <div className="col-md-9">
              {user.email}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 fw-bold">
              Phone
            </div>
            <div className="col-md-9">
              {user.phone}
            </div>
          </div>

          <hr />

          <h4 className="mb-4">
            Address Information
          </h4>

          <div className="row mb-3">
            <div className="col-md-3 fw-bold">
              Street
            </div>
            <div className="col-md-9">
              {user.address?.street}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3 fw-bold">
              City
            </div>
            <div className="col-md-9">
              {user.address?.city}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3 fw-bold">
              State
            </div>
            <div className="col-md-9">
              {user.address?.state}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3 fw-bold">
              Country
            </div>
            <div className="col-md-9">
              {user.address?.country}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 fw-bold">
              Zipcode
            </div>
            <div className="col-md-9">
              {user.address?.zipcode}
            </div>
          </div>
          <div className="text-center">
            <button
              className="btn btn-danger"
              onClick={logout}
            >
              Logout
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;