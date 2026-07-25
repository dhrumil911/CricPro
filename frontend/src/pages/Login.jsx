import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email is empty
    if (email === "") {
      setError("Please enter your email.");
      return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Check if password is empty
    if (password === "") {
      setError("Please enter your password.");
      return;
    }

    // Demo Login
    if (email === "admin@cricpro.com" && password === "admin123") {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🏏 CricPro</h1>
        <p>Welcome Back!</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>

            <a href="#">Forgot Password?</a>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;