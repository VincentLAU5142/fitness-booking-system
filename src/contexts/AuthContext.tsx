import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored tokens and user data on mount
    const accessToken = sessionStorage.getItem("accessToken");
    const storedUser = sessionStorage.getItem("user");

    if (accessToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: User, accessToken: string, refreshToken: string) => {
    try {
      // Store tokens
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);

      // Store user data separately from tokens
      const userDataToStore = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        image: userData.image,
      };

      sessionStorage.setItem("user", JSON.stringify(userDataToStore));
      setUser(userDataToStore);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error storing auth data:", error);
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const clearError = () => {
    // Empty function since we handle errors differently now
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
