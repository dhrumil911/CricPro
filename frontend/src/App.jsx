import { useEffect } from "react";
import Tournament from "./pages/Tournament";
import Team from "./pages/Team";
import Player from "./pages/Player";
import Match from "./pages/Match";
import PointsTable from "./pages/PointsTable";
import Reports from "./pages/Reports";
import AdminProfile from "./pages/AdminProfile";
import Settings from "./pages/Settings";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Default to dark theme as requested
    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      {(location.pathname === "/" || location.pathname === "/login") && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tournaments" element={<Tournament />} />
        <Route path="/teams" element={<Team />} />
        <Route path="/players" element={<Player />} />
        <Route path="/matches" element={<Match />} />
        <Route path="/points" element={<PointsTable />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<AdminProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;