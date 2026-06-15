import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await productService.getProductById(id);

      setProduct(response.data);
      setSelectedImage(response.data.imageUrl);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const getDeliveryDate = () => {
    const date = new Date();

    date.setDate(date.getDate() + 5);

    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const addToCart = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const response = await fetch("http://localhost:8080/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": userId,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      alert("Product added to cart!");
      return true;
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
      return false;
    }
  };

  const buyNow = async () => {
    const success = await addToCart();

    if (success) {
      navigate("/cart");
    }
  };

  if (!product) {
    return (
      <div className="container text-center mt-5">
        <div
          className="spinner-border text-primary"
          role="status"
        ></div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* Left Side - Images */}
        <div className="col-md-6">
          <div className="card shadow border-0">
            <img
              src={selectedImage}
              alt={product.name}
              className="img-fluid rounded"
              style={{
                height: "500px",
                objectFit: "contain",
                padding: "20px",
              }}
            />
          </div>

          {/* Thumbnails */}
          <div className="d-flex gap-2 mt-3 flex-wrap">
            <img
              src={product.imageUrl}
              alt="Main"
              className="border rounded"
              width="80"
              height="80"
              style={{
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() =>
                setSelectedImage(product.imageUrl)
              }
            />

            {product.additionalImages?.map(
              (image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index}`}
                  className="border rounded"
                  width="80"
                  height="80"
                  style={{
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setSelectedImage(image)
                  }
                />
              )
            )}
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="col-md-6">
          <span className="badge bg-primary mb-3">
            {product.category}
          </span>

          <h1 className="fw-bold">
            {product.name}
          </h1>

          <h2 className="text-success my-3">
            ₹{product.price}
          </h2>

          <div className="card bg-light border-0 mb-3">
            <div className="card-body py-2">
              <p className="mb-1">
                <span className="text-success fw-bold">
                  FREE Delivery
                </span>
              </p>
              <p className="mb-0">
                Delivery by{" "}
                <strong>{getDeliveryDate()}</strong>
              </p>
            </div>
          </div>

          <div className="mb-3">
            <span
              className={`badge ${
                product.stockQuantity > 0
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {product.stockQuantity > 0
                ? `In Stock (${product.stockQuantity})`
                : "Out of Stock"}
            </span>
          </div>

          <p
            className="text-muted"
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
            }}
          >
            {product.description}
          </p>

          <div className="mt-4 d-flex gap-3">
            <button
              className="btn btn-dark btn-lg"
              onClick={addToCart}
              disabled={product.stockQuantity <= 0}
            >
              Add To Cart
            </button>

            <button
              className="btn btn-success btn-lg"
              onClick={buyNow}
              disabled={product.stockQuantity <= 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;