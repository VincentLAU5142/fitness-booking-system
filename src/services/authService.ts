const API_URL = "https://dummyjson.com";

export const authService = {
  async login(username: string, password: string) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
      });

      if (!response.ok) {
        console.error("Login failed");
        return null; // or handle the error in another way
      }

      return await response.json();
    } catch (error) {
      console.error("An error occurred:", error);
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
        console.error("Failed to get user data");
        return null;
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
