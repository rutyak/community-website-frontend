import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { success } = await login({ email, password });

      if (success) {
        navigate("/");
      } 
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-paper">
        <h2 className="login-header">Welcome to Community</h2>
        <p className="login-subheader">Login to Get Started.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            placeholder="Email *"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            id="password"
            type="password"
            placeholder="Password *"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <span
            className="login-footer-link"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
