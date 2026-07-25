import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2>🏏 CricPro</h2>

        <p className="footer-description">
          Cricket Tournament Management System
        </p>

        <p className="footer-tagline">
          Manage tournaments, teams, players and matches with a modern and efficient platform.
        </p>

        <hr />

        <p className="copyright">
          © 2026 CricPro. All Rights Reserved.
        </p>

        <p className="developer">
          Designed & Developed by <strong>Dhrumil</strong>
        </p>
      </div>
    </footer>
  );
}

export default Footer;