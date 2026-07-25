import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Cricket Tournament Management System</h1>

        <p>
          Organize tournaments, manage teams, players, matches and view
          live statistics in one place.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">
            Get Started
          </button>

          <button className="btn-secondary">
            Live Tournament
          </button>
        </div>
      </div>

      <div className="hero-image">
        🏏
      </div>
    </section>
  );
}

export default Hero;