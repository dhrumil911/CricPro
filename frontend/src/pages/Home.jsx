import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import StatCard from "../components/StatCard";
import Footer from "../components/Footer";

import "../styles/stat.css";

function Home() {
  return (
    <>
      <Hero />

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose CricPro?</h2>

        <div className="feature-container">
          <FeatureCard
            icon="🏆"
            title="Tournament"
            description="Create and manage cricket tournaments easily."
          />

          <FeatureCard
            icon="👥"
            title="Teams"
            description="Add and organize teams with player details."
          />

          <FeatureCard
            icon="🏏"
            title="Players"
            description="Manage player profiles and statistics."
          />

          <FeatureCard
            icon="📅"
            title="Matches"
            description="Schedule matches and record live scores."
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats">
        <h2>Live Statistics</h2>

        <div className="stats-container">
          <StatCard
            icon="🏆"
            number="12"
            title="Tournaments"
          />

          <StatCard
            icon="👥"
            number="48"
            title="Teams"
          />

          <StatCard
            icon="🏏"
            number="720"
            title="Players"
          />

          <StatCard
            icon="📅"
            number="168"
            title="Matches"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;