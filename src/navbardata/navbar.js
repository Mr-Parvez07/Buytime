import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
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
    <nav className={`navbar navbar-expand-lg navbar-${theme}  p-3`}>
      <Link className="navbar-brand text-white" to="/">
        <img src="/btlogo.png" alt="BUYTIME Logo" width="60" height="60" className="d-inline-block align-top" />
        
      </Link>
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        
        <form className="form-inline mx-auto d-flex">
          <input
            className="form-control"
            type="search"
            placeholder="Search for Product"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        
        <Link className="btn btn-light square-pill  position-relative" to="/mycart">
          My Cart <FaShoppingCart />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        
        <span onClick={toggleTheme} className="ms-4 text-white ">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
