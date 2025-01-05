import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MenuDrawer.css";

const MenuDrawer = ({ user, toggleDrawer, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") toggleDrawer(false); 
      }}
      className="menu-drawer"
    >
      <ul className="menu-list">
        <li className="menu-item">
          <Link to="/" className="menu-link" onClick={() => toggleDrawer(false)}>
            Home
          </Link>
        </li>
        {user ? (
          <>
            <li
              className="menu-item"
              onClick={() => {
                navigate("/profile");
                toggleDrawer(false); 
              }}
            >
              Profile
            </li>
            <li
              className="menu-item"
              onClick={() => {
                handleLogout();
                toggleDrawer(false); 
              }}
            >
              Logout
            </li>
          </>
        ) : (
          <>
            <li className="menu-item">
              <Link
                to="/login"
                className="menu-link"
                onClick={() => toggleDrawer(false)}
              >
                Login
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/register"
                className="menu-link"
                onClick={() => toggleDrawer(false)}
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default MenuDrawer;
