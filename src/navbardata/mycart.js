import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './mycart.css';

function MyCart({ cart, setCart }) {
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + ((parseInt(item.price) || 0) * item.quantity), 0);
  };

  const formatPrice = (price) => {
    const numericPrice = parseInt(String(price).replace(/[^0-9]/g, ""), 10) || 0;
    return `Rs. ${numericPrice}`;
  };

  const handleclearcart = () => {
    if (cart.length === 0) {
      alert("Your cart is already empty!");
      return;
    }
    setCart([]); // Empty the cart
    navigate('/'); // Redirect to home page
  };
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add items before checkout.");
      return;
    }
  
    setOrderPlaced(true);
    setCart([]);
  
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  

  return (
    <div>
      {orderPlaced ? (
        <div className="order-confirmation">
          <h2>🎉 Order Placed Successfully!</h2>
        </div>
      ) : cart.length === 0 ? (
        <h1 className="center">Your cart is currently empty</h1>
      ) : (
        <div className="container">
          <div>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="product-info">
                  <img src={item.image} alt={item.title} className="product-image1" />
                  <div className="product-details">
                    <h5>{item.title}</h5>
                    <p>{formatPrice(item.price)}</p>
                  </div>
                </div>

                <div className="quantity-price">
                  <div>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <div className="total-price">
                    <p>Total: {formatPrice(parseFloat(item.price ?? 0) * item.quantity)}</p>
                  </div>
                </div>

                <div className="remove-item">
                  <button className="btn-danger" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3>Total Price: {formatPrice(calculateTotal())}</h3>
            <div className="button-container">
              <button className="clear" onClick={handleclearcart}>Clear Cart</button>
              <button className="success" onClick={handleCheckout}>Checkout</button>
            </div>

          </div>
        </div>
      )}

      <div>
        <Link to="/" className="btn btn1">
          Go Back to Shop
        </Link>
      </div>
    </div>
  );
}

export default MyCart;
