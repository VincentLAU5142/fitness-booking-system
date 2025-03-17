const API_URL = "https://dummyjson.com";

export const authService = {
  async login(username: string, password: string) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getCurrentUser(token: string) {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get user data");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
