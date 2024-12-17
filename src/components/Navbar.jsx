import React from "react";
import "./Navbar.css"; // Import the CSS file for styling
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <a href="#home" className="nav-link">Home</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#recipes" className="nav-link">Recipes</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>
      <SearchBar/>
  
    </nav>
  );
};

export default Navbar;
