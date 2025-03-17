import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/common/Loading";
import AnimationWrapper from "../components/Animation/AnimationWrapper"; // Import the AnimationWrapper

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
  message?: string;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          expiresInMins: 60,
        }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        setErrors({
          general: data.message || "Invalid credentials. Please try again.",
        });
        return;
      }

      // Extract user data from response
      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
      };

      // Login with separated data
      login(userData, data.accessToken, data.refreshToken);
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        general: "Login failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <AnimationWrapper>
        <div className="login-form-container">
          {isLoading && <Loading message="Logging in..." />}
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>

            {errors.general && (
              <div className="error-message">{errors.general}</div>
            )}

            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={errors.username ? "error" : ""}
                placeholder="Enter your username"
              />
              {errors.username && (
                <div className="error-message">{errors.username}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "error" : ""}
                placeholder="Enter your password"
              />
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </AnimationWrapper>
    </div>
  );
}