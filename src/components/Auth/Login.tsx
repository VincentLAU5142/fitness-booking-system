import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { loginUser } from "./auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, clearError } = useAuth();
  const [errorState, setErrorState] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    try {
      const response = await loginUser(username, password);
      await login(
        response,
        response.token,
        response.refreshToken // Store refresh token
      );
    } catch (error: any) {
      console.error("Login failed:", error);
      // Set the error message from the API response if available
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setErrorState(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        {errorState && <div className="error-message">{errorState}</div>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
