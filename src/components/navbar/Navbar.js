import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import MenuDrawer from "../MenuDrawer/MenuDrawer";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">CommunityHub</div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        {user ? (
          <div className="user-menu">
            <button
              className="user-menu-button"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
            <button onClick={handleLogout}>Logout</button>
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
        <button
          className="menu-button"
          onClick={() => toggleDrawer(true)} 
        >
          ☰
        </button>
        {drawerOpen && (
          <div className={`drawer ${drawerOpen ? "open" : ""}`}>
            <MenuDrawer
              user={user}
              toggleDrawer={toggleDrawer}
              handleLogout={handleLogout}
            />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
