import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);

    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const addToCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Product added to cart!");
  };

  const buyNow = () => {
    addToCart();
    navigate("/cart");
  };

  return (
    <div className="card h-100 shadow-sm border-0">

      {/* Product Image */}
      <Link
        to={`/products/${product.id}`}
        className="text-decoration-none"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="card-img-top"
          style={{
            height: "250px",
            objectFit: "contain",
            padding: "15px",
          }}
        />
      </Link>

      <div className="card-body d-flex flex-column">

        {/* Category */}
        <span className="badge bg-primary mb-2 align-self-start">
          {product.category?.name || product.category}
        </span>

        {/* Product Name */}
        <h5
          className="card-title fw-bold"
          style={{
            minHeight: "50px",
          }}
        >
          {product.name}
        </h5>

        {/* Description */}
        <p
          className="text-muted small"
          style={{
            height: "60px",
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        {/* Price */}
        <h4 className="text-success fw-bold">
          ₹{product.price}
        </h4>

        {/* Delivery */}
        <p className="small mb-2">
          🚚 Delivery by{" "}
          <strong>{getDeliveryDate()}</strong>
        </p>

        {/* Stock */}
        <div className="mb-3">
          {product.stockQuantity > 0 ? (
            <span className="badge bg-success">
              In Stock ({product.stockQuantity})
            </span>
          ) : (
            <span className="badge bg-danger">
              Out of Stock
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-auto d-grid gap-2">

          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline-primary"
          >
            View Details
          </Link>

          <button
            className="btn btn-dark"
            onClick={addToCart}
            disabled={product.stockQuantity <= 0}
          >
            Add To Cart
          </button>

          <button
            className="btn btn-success"
            onClick={buyNow}
            disabled={product.stockQuantity <= 0}
          >
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;