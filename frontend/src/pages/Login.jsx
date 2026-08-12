import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", {
      email: formData.email,
      password: formData.password,
    });

    localStorage.setItem("token", response.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    navigate("/");
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message || "Login failed"
    );
  }
}

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="auth-header">
          <div className="auth-logo">✓</div>

          <h1>Welcome Back</h1>
          <p>Login to manage your tasks</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-field">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;