import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";

import adminService from "../services/adminService";

const AdminProducts = () => {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==========================================
  // LOAD PRODUCTS
  // ==========================================

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data =
        await adminService.getProducts();

      setProducts(
        Array.isArray(data)
          ? data
          : []
      );

      setError("");
    } catch (error) {
      console.error(
        "Products load failed:",
        error
      );

      setError(
        "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const handleDelete = async (
    productId
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await adminService.deleteProduct(
        productId
      );

      await loadProducts();
    } catch (error) {
      console.error(
        "Delete failed:",
        error
      );

      alert(
        "Failed to delete product"
      );
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold">
              Product Management
            </h2>

            <p className="text-muted mb-0">
              Add, edit and remove
              products.
            </p>
          </div>

          <Link
            to="/admin/products/add"
            className="btn btn-success"
          >
            + Add Product
          </Link>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="alert alert-info">
            No products found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>

                  <th>Image</th>

                  <th>Name</th>

                  <th>Category</th>

                  <th>Price</th>

                  <th>Stock</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map(
                  (product) => (
                    <tr
                      key={
                        product.id
                      }
                    >
                      <td>
                        {product.id}
                      </td>

                      <td>
                        <img
                          src={
                            product.imageUrl
                          }
                          alt={
                            product.name
                          }
                          width="70"
                          height="70"
                          style={{
                            objectFit:
                              "contain",
                          }}
                        />
                      </td>

                      <td>
                        {product.name}
                      </td>

                      <td>
                        {
                          product.category
                        }
                      </td>

                      <td>
                        ₹
                        {product.price}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            product.stockQuantity >
                            0
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {
                            product.stockQuantity
                          }
                        </span>
                      </td>

                      <td>
                        <div className="d-flex gap-2">
                          <Link
                            to={`/admin/products/edit/${product.id}`}
                            className="btn btn-primary btn-sm"
                          >
                            Edit
                          </Link>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDelete(
                                product.id
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProducts;