import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MenuDrawer from "../menuDrawer/MenuDrawer";
import "./Navbar.css";

function Navbar() {
  const { user, logout, drawerOpen, toggleDrawer } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">CommunityHub</div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        {user ? (
          <div className="user-menu">
            <Link to="/profile">
              <button className="user-menu-button">Profile</button>
            </Link>
            <Link to="/">
              <button onClick={logout}>Logout</button>
            </Link>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login">
              <button className="auth-button">Login</button>
            </Link>
            <Link to="/register">
              <button className="auth-button">Register</button>
            </Link>
          </div>
        )}
      </div>

      <div className="mobile-menu">
        <button className="menu-button" onClick={() => toggleDrawer(true)}>
          ☰
        </button>
        {drawerOpen && (
          <div className={`drawer ${drawerOpen ? "open" : ""}`}>
            <MenuDrawer user={user} toggleDrawer={toggleDrawer} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
