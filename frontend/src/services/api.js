import axios from "axios";

// Create Axios Instance with base configuration
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Interceptor to automatically append JWT token to secure requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Services
export const login = async (email, password) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

export const getProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};

// Dashboard Services
export const getDashboardStats = async () => {
  const response = await API.get("/dashboard/stats");
  return response.data;
};

export const getDashboardMatches = async () => {
  const response = await API.get("/dashboard/matches");
  return response.data;
};

export const getDashboardLeaders = async () => {
  const response = await API.get("/dashboard/leaders");
  return response.data;
};

export const getDashboardCharts = async () => {
  const response = await API.get("/dashboard/charts");
  return response.data;
};

export default {
  login,
  getProfile,
  getDashboardStats,
  getDashboardMatches,
  getDashboardLeaders,
  getDashboardCharts
};
