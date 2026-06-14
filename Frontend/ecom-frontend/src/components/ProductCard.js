import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const addToCart = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User-ID": userId,
          },
          body: JSON.stringify({
            productId: product.id,
            quantity: 1,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const buyNow = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User-ID": userId,
          },
          body: JSON.stringify({
            productId: product.id,
            quantity: 1,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      navigate("/cart");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={
          product.imageUrl ||
          "https://via.placeholder.com/400"
        }
        className="card-img-top"
        alt={product.name}
        style={{
          height: "250px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">
        <span className="badge bg-primary mb-2">
          {product.category}
        </span>

        <h5 className="card-title fw-bold">
          {product.name}
        </h5>

        <p className="card-text text-muted flex-grow-1">
          {product.description}
        </p>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-success mb-0">
            ₹{product.price}
          </h4>

          <span className="badge bg-success">
            In Stock
          </span>
        </div>

        <div className="d-grid gap-2">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline-primary"
          >
            View Details
          </Link>

          <button
            type="button"
            className="btn btn-dark"
            onClick={addToCart}
          >
            Add To Cart
          </button>

          <button
            type="button"
            className="btn btn-success"
            onClick={buyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;