import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";

import adminService from "../services/adminService";

const AdminAddProduct = () => {
  const navigate =
    useNavigate();

  const [product, setProduct] =
    useState({
      name: "",
      description: "",
      price: "",
      stockQuantity: "",
      category: "",
      imageUrl: "",
      additionalImages: [],
    });

  const [additionalImagesText,
    setAdditionalImagesText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const additionalImages =
        additionalImagesText
          .split(",")
          .map((url) =>
            url.trim()
          )
          .filter(Boolean);

      const requestBody = {
        ...product,

        price: Number(
          product.price
        ),

        stockQuantity: Number(
          product.stockQuantity
        ),

        additionalImages,
      };

      await adminService.createProduct(
        requestBody
      );

      alert(
        "Product added successfully!"
      );

      navigate(
        "/admin/products"
      );
    } catch (error) {
      console.error(
        "Product creation failed:",
        error
      );

      alert(
        "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div
        className="container py-5"
        style={{
          maxWidth: "900px",
        }}
      >
        <div className="card shadow border-0">
          <div className="card-body p-4">
            <h2 className="fw-bold mb-4">
              Add Product
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
            >
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Product Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={
                      product.name
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    value={
                      product.category
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Price
                  </label>

                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    className="form-control"
                    value={
                      product.price
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Stock Quantity
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="stockQuantity"
                    className="form-control"
                    value={
                      product.stockQuantity
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">
                    Main Image URL
                  </label>

                  <input
                    type="url"
                    name="imageUrl"
                    className="form-control"
                    value={
                      product.imageUrl
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">
                    Additional Image
                    URLs
                  </label>

                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Separate URLs using commas"
                    value={
                      additionalImagesText
                    }
                    onChange={(e) =>
                      setAdditionalImagesText(
                        e.target
                          .value
                      )
                    }
                  />
                </div>

                <div className="col-12 mb-4">
                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    name="description"
                    className="form-control"
                    rows="5"
                    value={
                      product.description
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : "Add Product"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    navigate(
                      "/admin/products"
                    )
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAddProduct;