import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./MenuDrawer.css";

const MenuDrawer = ({ user, toggleDrawer }) => {
  const { logout } = useAuth();


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
          <Link
            to="/"
            className="menu-link"
            onClick={() => toggleDrawer(false)} 
          >
            Home
          </Link>
        </li>
        {user ? (
          <>
            <li className="menu-item">
              <Link
                to="/profile"
                className="menu-link"
                onClick={() => toggleDrawer(false)}
              >
                Profile
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/"
                className="menu-link"
                onClick={() => {
                  logout(); 
                  toggleDrawer(false);
                }}
              >
                Logout
              </Link>
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
