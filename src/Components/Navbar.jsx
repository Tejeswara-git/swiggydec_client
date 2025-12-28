import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>SWIGGY</h1>
      </div>
      <div className="navbar-links">
        <p className="navbar-link">Login</p>
        <p className="navbar-link">Register</p>
      </div>
    </nav>
  );
};

export default Navbar;
