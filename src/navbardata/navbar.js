import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSun, FaMoon } from 'react-icons/fa';
import CardData from './card.json';
import './navbar.css';

function Navbar({ setFilteredProducts, cartCount }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.classList.remove('bg-light', 'bg-dark');
    document.body.classList.add(theme === 'light' ? 'bg-light' : 'bg-dark');
  }, [theme]);

  
  useEffect(() => {
    const filtered = CardData.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, setFilteredProducts]);

  return (
    <nav className={`navbar navbar-${theme}`}>
  <Link className="navbar-brand" to="/">
    <img src="/btlogo.png" alt="BUYTIME Logo" width="50" height="50" />
  </Link>

  <input
    className="form-control mx-2"
    type="search"
    placeholder="Search for Product"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />

  <Link className="btn btn-light position-relative mx-2" to="/mycart">
    Cart <FaShoppingCart />
    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
  </Link>

  <span onClick={toggleTheme} className="ms-4">
    {theme === 'light' ? <FaMoon /> : <FaSun />}
  </span>
</nav>

  
  );
}

export default Navbar;
