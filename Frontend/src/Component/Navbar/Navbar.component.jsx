import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        NUTRAKIYA
      </Link>
      <div className="navbar-menu">
        <div className="navbar-menu-item">
          <Link to="/">Home</Link>
        </div>
        <div className="navbar-menu-item">
          <Link to="/about">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
