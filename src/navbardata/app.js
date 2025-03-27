import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MyCart from './mycart';
import Card from './card';
import Navbar from './navbar';
import CardData from './card.json';
import ProductDetail from './productdetail';

function App() {
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(CardData);

  // Add item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div>
      <Navbar cartCount={cart.length} setFilteredProducts={setFilteredProducts} />

      <Routes>
        <Route
          path="/"
          element={<Card filteredProducts={filteredProducts} addToCart={addToCart} />}
        />
        <Route
          path="/Mycart"
          element={<MyCart cart={cart} setCart={setCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetail products={CardData} addToCart={addToCart} />} // passing CardData here
        />
      </Routes>
    </div>
  );
}

export default App;
