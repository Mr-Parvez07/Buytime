import React, { useState, useEffect } from "react";

const Themetoggle = () => {
  // Retrieve theme from localStorage, default to 'light'
  const savedTheme = localStorage.getItem("theme");
  const validThemes = ["light", "dark"];
  const initialTheme = validThemes.includes(savedTheme) ? savedTheme : "light";

  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    // Set the data-bs-theme attribute on the document element
    document.documentElement.setAttribute("data-bs-theme", theme);
    // Store the theme in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className="btn btn-secondary"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
};

export default Themetoggle;
