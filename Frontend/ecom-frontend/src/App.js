import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import NavbarLoggedIn from "./components/NavbarLoggedIn";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import AdminOrders from "./pages/AdminOrders";

import AdminRoute from "./components/AdminRoute";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminUsers from "./pages/AdminUsers";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  return (
    <Router>
      {isLoggedIn ? (
        <NavbarLoggedIn />
      ) : (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/orders/:id" element={<OrderTracking />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

        <Route element={<AdminRoute />}>
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/products"
          element={<AdminProducts />}
        />

        <Route
          path="/admin/products/add"
          element={<AdminAddProduct />}
        />

        <Route
          path="/admin/products/edit/:id"
          element={<AdminEditProduct />}
        />

        <Route
          path="/admin/users"
          element={<AdminUsers />}
        />
      </Route>

      </Routes>
    </Router>
  );
}

export default App;