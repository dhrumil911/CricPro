import logo from "../assets/logo/cricpro-logo.png";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="CricPro Logo" />
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;