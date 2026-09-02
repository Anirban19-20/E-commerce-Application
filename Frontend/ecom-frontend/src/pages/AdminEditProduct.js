import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";

import adminService from "../services/adminService";

const AdminEditProduct = () => {
  const { id } = useParams();

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
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    const loadProduct =
      async () => {
        try {
          const data =
            await adminService.getProductById(
              id
            );

          setProduct({
            name:
              data.name || "",

            description:
              data.description ||
              "",

            price:
              data.price || "",

            stockQuantity:
              data.stockQuantity ??
              "",

            category:
              data.category || "",

            imageUrl:
              data.imageUrl ||
              "",

            additionalImages:
              data.additionalImages ||
              [],
          });

          setAdditionalImagesText(
            (
              data.additionalImages ||
              []
            ).join(", ")
          );
        } catch (error) {
          console.error(
            "Product load failed:",
            error
          );

          alert(
            "Failed to load product"
          );
        } finally {
          setLoading(false);
        }
      };

    loadProduct();
  }, [id]);

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
      setSaving(true);

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

      await adminService.updateProduct(
        id,
        requestBody
      );

      alert(
        "Product updated successfully!"
      );

      navigate(
        "/admin/products"
      );
    } catch (error) {
      console.error(
        "Update failed:",
        error
      );

      alert(
        "Failed to update product"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />

        <div className="container text-center py-5">
          <div className="spinner-border text-primary" />
        </div>
      </>
    );
  }

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
              Edit Product
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
                    Additional Images
                  </label>

                  <textarea
                    className="form-control"
                    rows="3"
                    value={
                      additionalImagesText
                    }
                    onChange={(e) =>
                      setAdditionalImagesText(
                        e.target
                          .value
                      )
                    }
                    placeholder="Separate URLs using commas"
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
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving
                    ? "Updating..."
                    : "Update Product"}
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

export default AdminEditProduct;