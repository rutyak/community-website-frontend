import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../../components/usercard/UserCard";
import "./Home.css";

const Base_url = process.env.REACT_APP_BACKEND_URL;

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${Base_url}/fetch/users`);
        console.log(data.data);
        setUsers(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Our Community</h1>
        <p className="hero-description">
          Discover, create, and share your thoughts with the world!
        </p>
      </div>

      <section>
        <div className="members-header">
          <h2>Community Members</h2>
        </div>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <span>Loading users...</span>
          </div>
        ) : users.length > 0 ? (
          <div className="users-grid">
            {users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <p className="no-posts">No users available at the moment.</p>
        )}
      </section>
    </div>
  );
}

export default Home;
