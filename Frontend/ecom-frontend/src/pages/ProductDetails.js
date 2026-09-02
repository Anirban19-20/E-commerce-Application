import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import productService from "../services/productService";

import cartService from "../services/cartService";

const ProductDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState(null);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [adding, setAdding] =
    useState(false);

  // ==========================================
  // LOAD PRODUCT
  // ==========================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data =
          await productService.getProductById(
            id
          );

        setProduct(data);

        setSelectedImage(
          data?.imageUrl || ""
        );
      } catch (error) {
        console.error(
          "Error fetching product:",
          error
        );
      }
    };

    fetchProduct();
  }, [id]);

  // ==========================================
  // DELIVERY DATE
  // ==========================================

  const getDeliveryDate = () => {
    const date = new Date();

    date.setDate(date.getDate() + 5);

    return date.toLocaleDateString(
      "en-IN",
      {
        weekday: "short",
        day: "numeric",
        month: "short",
      }
    );
  };

  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = async () => {
    const userId =
      localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");

      navigate("/login");

      return false;
    }

    if (!product) {
      return false;
    }

    try {
      setAdding(true);

      await cartService.addToCart(
        userId,
        product.id,
        1
      );

      alert("Product added to cart!");

      return true;
    } catch (error) {
      console.error(
        "Add to cart failed:",
        error
      );

      alert("Failed to add product");

      return false;
    } finally {
      setAdding(false);
    }
  };

  // ==========================================
  // BUY NOW
  // ==========================================

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
        />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* LEFT */}

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
                setSelectedImage(
                  product.imageUrl
                )
              }
            />

            {product.additionalImages?.map(
              (image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
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

        {/* RIGHT */}

        <div className="col-md-6">
          <span className="badge bg-primary mb-3">
            {product.category?.name ||
              product.category}
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
                <strong>
                  {getDeliveryDate()}
                </strong>
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
              disabled={
                adding ||
                product.stockQuantity <= 0
              }
            >
              {adding
                ? "Adding..."
                : "Add To Cart"}
            </button>

            <button
              className="btn btn-success btn-lg"
              onClick={buyNow}
              disabled={
                adding ||
                product.stockQuantity <= 0
              }
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