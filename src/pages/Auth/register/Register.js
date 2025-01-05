import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Register.css"; 

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setLoading(true); 

    try {
      const formData = new FormData();
      formData.append("name",name);
      formData.append("email",email);
      formData.append("password", password);
      if(photo){
        formData.append("photo",photo);
      }

      const { success } = await register(formData); 
      if (success) {
        toast.success("Registered successfully!");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e){
     const file = e.target.files[0];
     if(file){
      setPhoto(file);
     }
  }

  return (
    <div className="register-container">
      <div className="register-paper">
        <h2 className="register-header">Create an Account</h2>
        <p className="register-subheader">Join us and start your journey today.</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            className="register-input"
            placeholder="Username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="register-input"
            placeholder="Upload you photo"
          />
          <input
            className="register-input"
            id="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="register-input"
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="register-input"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="register-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <span
            className="register-footer-link"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
