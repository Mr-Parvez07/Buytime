import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; 
import App from './navbardata/app';  // Import App component

// Define and render the root of the app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />  {/* Render the App component */}
  </BrowserRouter>
);

reportWebVitals();
