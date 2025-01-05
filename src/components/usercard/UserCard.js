import React from "react";
import { Link } from "react-router-dom";
import "./UserCard.css"; 

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <img src={user.profile} alt={user.name} className="user-photo" />
        <div>
          <h3 className="user-name">{user.name}</h3>
          <p className="user-email">{user.email}</p>
        </div>
      </div>

      <Link className="view-profile-link">
        View Profile
      </Link>
    </div>
  );
};

export default UserCard;
