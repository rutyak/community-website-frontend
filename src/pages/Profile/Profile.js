import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";
import Form from "../../components/form/Form";

const Profile = () => {
  const { userData } = useAuth();

  useEffect(() => {
    console.log("userData :", userData?.profile);
  }, [userData]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-container">
          <img className="avatar" src={userData?.profile} alt="User Profile" />
          <div className="username">{userData?.name}</div>
        </div>
      </div>

      <Form />
    </div>
  );
};

export default Profile;
