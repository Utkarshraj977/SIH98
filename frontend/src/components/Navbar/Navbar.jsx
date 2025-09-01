import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Student ERP</div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active-link" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "")}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/cards" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Cards
          </NavLink>
        </li>
      </ul>
      <div className="auth-buttons">
        <button className="btn signin">Sign In</button>
        <button className="btn signout">Sign Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
