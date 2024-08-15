import React, { useState } from "react";
import { useAuth } from "../../utils/Context/protectedRoutes";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Dashboard = () => {
  const [user, setUser] = useState({
    fullname: "John Doe",
    email: "john.doe@example.com",
    role: "user",
  });
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [message, setMessage] = useState("");
  const { logout } = useAuth();

  const handleLogout = () => {
    console.log("User signed out");
    logout();
    navigate("/login");
    // Clear user authentication (e.g., remove token from local storage)
    localStorage.removeItem("authToken");
    // Redirect to login page or perform other logout actions
    window.location.href = "/login";
  };

  const handleInputChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You might need to include an authorization token here, e.g.:
          // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(updatedUser);
        setMessage("Profile updated successfully!");
        setEditMode(false);
      } else {
        setMessage(`Error: ${data.message || "Failed to update profile"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li>
              <a href="#overview">Overview</a>
            </li>
            <li>
              <a href="#analytics">Analytics</a>
            </li>
            <li>
              <a href="#settings">Settings</a>
            </li>
            <li>
              <a href="#profile">Profile</a>
            </li>
            <li>
              <a href="#logout" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="main-content">
        <header className="top-bar">
          <h1>Welcome to Your Dashboard</h1>
        </header>
        <section className="content-area">
          <div className="card">
            <h3>Profile</h3>
            {message && <p className="message">{message}</p>}
            {!editMode ? (
              <>
                <p>
                  <strong>Full Name:</strong> {user.fullname}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
                <button
                  onClick={() => setEditMode(true)}
                  className="edit-button"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <form onSubmit={handleUpdateProfile}>
                <div className="form-group">
                  <label htmlFor="fullname">Full Name</label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={updatedUser.fullname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={updatedUser.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button type="submit" className="save-button">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
