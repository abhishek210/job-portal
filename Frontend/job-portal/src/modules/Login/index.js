import React, { useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/Context/protectedRoutes";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login("dummyToken");
        localStorage.setItem("myKey", "dummyToken");
        setMessage("Login successful!");
        navigate("/dashboard");
      } else {
        setMessage(`Error: ${data.message || "Login failed"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="recruter">Recruter</option>
          </select>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="linkRegister">
        <h3>
          <Link to="/">Register</Link>
        </h3>
      </div>
    </div>
  );
};

export default Login;
