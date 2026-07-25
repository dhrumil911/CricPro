import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import QuickAction from "../components/QuickAction";
import "../styles/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard">

        <h1>🏏 CricPro Dashboard</h1>
        <p>Welcome back, Admin 👋</p>

        <div className="dashboard-cards">
          <DashboardCard
            number="12"
            title="Tournaments"
            icon="🏆"
          />

          <DashboardCard
            number="48"
            title="Teams"
            icon="👥"
          />

          <DashboardCard
            number="720"
            title="Players"
            icon="🏏"
          />

          <DashboardCard
            number="168"
            title="Matches"
            icon="📅"
          />
        </div>

        <h2>Quick Actions</h2>

        <div className="quick-actions">

          <QuickAction
            title="Add Tournament"
            link="/tournaments"
          />

          <QuickAction
            title="Add Team"
            link="/teams"
          />

          <QuickAction
            title="Add Player"
            link="/players"
          />

          <QuickAction
            title="Schedule Match"
            link="/matches"
          />

        </div>

      </div>
    </div>
  );
}

export default Dashboard;