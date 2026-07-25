import "../styles/stat.css";

function StatCard({ icon, number, title }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-number">
        {number}
      </div>

      <div className="stat-title">
        {title}
      </div>

    </div>
  );
}

export default StatCard;