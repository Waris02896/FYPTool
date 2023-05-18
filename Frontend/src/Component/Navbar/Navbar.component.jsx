import React from "react";
import nutrackiya2 from './nutrackiya22.png';
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* <h2>NUTRAKIYA</h2> */}
      <div className='img2'>
      <img src={nutrackiya2} alt="NU Trackiya" className="landing-image"
      style={{width: "100px", height: "30px",marginTop: "10px", marginLeft: "20px" }} />
      </div>
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
