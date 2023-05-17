import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>NUTRAKIYA</h2>
      <div className="navbar-menu">
        <div className="navbar-menu-item">
          <Link to="/">Home</Link>
        </div>
        {/* <div className="navbar-menu-item">
          <Link to="/about">About</Link>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
