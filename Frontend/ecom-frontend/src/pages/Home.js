import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import productService from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  const filteredProducts = products.filter((product) =>
    product.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">

      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">
          Welcome to NexaBuy
        </h1>

        <p className="text-muted fs-5">
          Discover the latest gadgets, laptops,
          smartphones and much more.
        </p>
      </div>

      {/* Product Count */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">
          Products
        </h4>

        <span className="badge bg-primary fs-6">
          {filteredProducts.length} Items
        </span>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center mt-5">
          <h3>No Products Found</h3>
          <p className="text-muted">
            Try searching with another product name.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="col-lg-3 col-md-4 col-sm-6"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Home;