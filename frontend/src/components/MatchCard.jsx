function MatchCard({ match, deleteMatch, editMatch }) {
  return (
    <div className="match-card">
      <div className="card-top">
        <h2>🏏 {match.tournamentName}</h2>
        <span className={`status ${match.status === "Live" ? "live" : match.status === "Completed" ? "completed" : "upcoming"}`}>
          {match.status}
        </span>
      </div>

      <p>
        <strong>👥 Teams:</strong> {match.teamA} vs {match.teamB}
      </p>

      <p>
        <strong>📅 Date:</strong> {match.matchDate}
      </p>

      <p>
        <strong>⏰ Time:</strong> {match.matchTime}
      </p>

      <p>
        <strong>📍 Venue:</strong> {match.venue}
      </p>

      <p>
        <strong>🎯 Type:</strong> {match.matchType}
      </p>

      <div className="card-actions">
        <button className="edit-btn" onClick={() => editMatch(match)}>
          ✏ Edit
        </button>

        <button className="delete-btn" onClick={() => deleteMatch(match.id)}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default MatchCard;
