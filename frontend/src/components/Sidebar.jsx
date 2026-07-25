import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo/cricpro-logo.png";
import "../styles/sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <img src={logo} alt="CricPro Logo" />
      </div>

      <nav className="sidebar-menu">

        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          🏠 Dashboard
        </Link>

        <Link to="/tournaments">
          🏆 Tournaments
        </Link>

        <Link to="/teams">
          👥 Teams
        </Link>

        <Link to="/players">
          🏏 Players
        </Link>

        <Link to="/matches">
          📅 Matches
        </Link>

        <Link to="/points">
          📊 Points Table
        </Link>

        <Link to="/reports">
          📑 Reports
        </Link>

        <Link to="/settings">
          ⚙ Settings
        </Link>

      </nav>

      <div className="sidebar-footer">
        <Link to="/">🚪 Logout</Link>
      </div>

    </aside>
  );
}

export default Sidebar;