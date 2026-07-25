function TeamCard({ team, deleteTeam, editTeam }) {
  return (
    <div className="team-card">
      <div className="card-top">
        <h2>🏏 {team.name}</h2>
        <span className={`status ${team.status === "Active" ? "active" : "inactive"}`}>
          {team.status}
        </span>
      </div>

      <p>
        <strong>👤 Captain:</strong> {team.captain}
      </p>

      <p>
        <strong>📍 City:</strong> {team.city}
      </p>

      <p>
        <strong>🏏 Coach:</strong> {team.coach}
      </p>

      <p>
        <strong>👥 Total Players:</strong> {team.totalPlayers}
      </p>

      <div className="card-actions">
        <button className="edit-btn" onClick={() => editTeam(team)}>
          ✏ Edit
        </button>

        <button className="delete-btn" onClick={() => deleteTeam(team.id)}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default TeamCard;