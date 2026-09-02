import React from "react";

import {
  Navigate,
  Outlet,
} from "react-router-dom";

const AdminRoute = () => {
  const userString =
    localStorage.getItem("user");

  if (!userString) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  try {
    const user =
      JSON.parse(userString);

    if (user.role !== "ADMIN") {
      return (
        <Navigate
          to="/"
          replace
        />
      );
    }

    return <Outlet />;
  } catch (error) {
    console.error(
      "Invalid user data:",
      error
    );

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
};

export default AdminRoute;