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

// Tournament Services
export const getTournaments = async (params) => {
  const response = await API.get("/tournaments", { params });
  return response.data;
};

export const getTournamentById = async (id) => {
  const response = await API.get(`/tournaments/${id}`);
  return response.data;
};

export const createTournament = async (data) => {
  const response = await API.post("/tournaments", data);
  return response.data;
};

export const updateTournament = async (id, data) => {
  const response = await API.put(`/tournaments/${id}`, data);
  return response.data;
};

export const deleteTournamentApi = async (id) => {
  const response = await API.delete(`/tournaments/${id}`);
  return response.data;
};

export const getTournamentStats = async () => {
  const response = await API.get("/tournaments/stats");
  return response.data;
};

// Team Services
export const getTeams = async (params) => {
  const response = await API.get("/teams", { params });
  return response.data;
};

export const getTeamById = async (id) => {
  const response = await API.get(`/teams/${id}`);
  return response.data;
};

export const createTeam = async (data) => {
  const response = await API.post("/teams", data);
  return response.data;
};

export const updateTeam = async (id, data) => {
  const response = await API.put(`/teams/${id}`, data);
  return response.data;
};

export const deleteTeamApi = async (id) => {
  const response = await API.delete(`/teams/${id}`);
  return response.data;
};

export const getTeamStats = async () => {
  const response = await API.get("/teams/stats");
  return response.data;
};

export const getTeamDropdown = async () => {
  const response = await API.get("/teams/dropdown");
  return response.data;
};

export default {
  login,
  getProfile,
  getDashboardStats,
  getDashboardMatches,
  getDashboardLeaders,
  getDashboardCharts,
  getTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournamentApi,
  getTournamentStats,
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeamApi,
  getTeamStats,
  getTeamDropdown
};
