import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import "./Form.css";

function Form({ onClose, onSuccess }) {
  const { userData, update } = useAuth();
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [photo, setPhoto] = useState(userData?.photo || null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (userData) {
      setName(userData?.name || "");
      setEmail(userData?.email || "");
      setPhoto(userData?.photo || null);
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!userData || !userData?._id) {
      toast.error("You need to be logged in to proceed.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (photo) formData.append("photo", photo);
    if (password) formData.append("password", password);

    try {
      const res = await update(formData, userData?._id);

      if (res.status === 200) {
        toast.success(
          "User updated successfully!"
        );
        onSuccess();
        if (onClose) onClose();
      }
    } catch (error) {
      console.error("Error submitting user:", error.response || error.message);
      toast.error("Failed to update user");
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Update profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="photo">Upload Photo</label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
            {photo && (
              <p className="photo-preview">
                {photo.name || "Photo is ready to upload"}
              </p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">Change Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Current password"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
            />
          </div>

          <div className="button-group">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
