import Tournament from "./pages/Tournament";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/dashboard" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tournaments" element={<Tournament />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;