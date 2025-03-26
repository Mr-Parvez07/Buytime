import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./productdetail.css";
import CardData from "./productdetail.json";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = CardData.find((product) => product.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return <div>Product not found!</div>;
  }

  const handleAddToCart = () => {
    if (addToCart) {
      const productToAdd = {
        ...product,
        quantity: 1,
        price: parseInt(product.price.replace(/[^0-9]/g, ""), 10) || 0, // Ensure price is a number
      };
      addToCart(productToAdd);
    }
    setShowModal(true);
  };
  
  
  
  return (
    <div className="product-detail-container">
      <h1 className="product-title">{product.title}</h1>
      
      <div className="product-detail">
        {/* Image, Price, and Description in One Row */}
        <div className="product-content">
          <img
            src={process.env.PUBLIC_URL + `/image/${product.image}`}
            alt={product.title}
            className="product-image"
          />
          <div className="product-info">
            <p className="product-id">Model: {product.title}</p>
            <p className="product-price">Price: {product.price}</p>
            <p className="product-description">About Product: {product.description}</p>
          </div>
        </div>
  
        {/* Buttons Below */}
        <div className="buttons">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Back to Products
          </button>
        </div>
      </div>
  
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>✅ Added to Cart</h2>
            <p>{product.title} has been added to your cart!</p>
            <button className="btn btn-primary" onClick={() => navigate("/mycart")}>
              View Cart
            </button>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}  

export default ProductDetail;
