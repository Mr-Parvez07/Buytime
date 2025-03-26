import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 
import './card.css';

function Card({ filteredProducts, addToCart }) {
  const [zoomedImage, setZoomedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const handleImageClick = (id) => {
    setZoomedImage((prevZoomedImage) => (prevZoomedImage === id ? null : id));
  };
  
  const formatPrice = (price) => {
    const numericPrice = parseInt(String(price).replace(/[^0-9]/g, ""), 10) || 0; // Remove non-numeric characters
    return `Rs. ${numericPrice}`;
  };
  

  const handleAddToCart = (product) => {
    addToCart({ ...product, price: String(product.price) }); // Ensure price is always a string
    setSelectedProduct(product);
    setShowModal(true);
  };
  
  return (
    <div>
      <h1 className="text-center">Our Products</h1>
      <div className="container1">
        <div className="ClassCom1">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item.id} >
                <div>
                  <Link to={`/product/${item.id}`} className="card-link">
                    <div className="card1">
                      <div className="card-img-container">
                        <img
                          src={item.image}
                          className={`card-img-top ${zoomedImage === item.id ? 'card-img-zoomed' : ''}`}
                          alt={item.title}
                          onClick={() => handleImageClick(item.id)} 
                        />
                      </div>
                      <div className="card-info">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-price">{formatPrice(item.price)}</p> 
                      </div>
                    </div>
                  </Link>

                  <button className="btn2" onClick={() => handleAddToCart(item)}>
                    <FaShoppingCart className="cart-icon" /> 
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>

      
      {showModal && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>✅ Added to Cart</h2>
            <img src={selectedProduct.image} alt={selectedProduct.title} className="modal-image" />
            <h3>{selectedProduct.title}</h3>
            <p>{formatPrice(selectedProduct.price)}</p>
            <p>{selectedProduct.description}</p>
            <button className="btn-primary" onClick={() => navigate('/mycart')}>
              Go to Cart
            </button>
            <button className="btn-secondary" onClick={() => setShowModal(false)}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
