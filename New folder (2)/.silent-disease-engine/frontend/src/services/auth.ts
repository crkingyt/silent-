import api from "./api";

export const authService = {
  login: async (credentials: any) => {
    // Mock response for now
    return {
      user: { id: 1, name: "John Doe", role: "patient" },
      token: "mock-jwt-token",
    };
    // return api.post("/auth/login", credentials);
  },

  signup: async (userData: any) => {
    // Mock response
    return {
      user: { id: 1, name: userData.name, role: "patient" },
      token: "mock-jwt-token",
    };
    // return api.post("/auth/signup", userData);
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};
