function DashboardCard({ number, title, icon }) {
  return (
    <div className="dashboard-card">
      <div className="card-icon">
        {icon}
      </div>

      <div className="card-content">
        <h2>{number}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default DashboardCard;