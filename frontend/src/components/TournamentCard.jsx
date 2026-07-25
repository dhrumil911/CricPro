function TournamentCard({
  tournament,
  deleteTournament,
  editTournament,
}) {
  return (
    <div className="tournament-card">

      <h2>🏆 {tournament.name}</h2>

      <p>
        <strong>🏅 Type:</strong> {tournament.type}
      </p>

      <p>
        <strong>📍 Venue:</strong> {tournament.venue}
      </p>

      <p>
        <strong>👥 Teams:</strong> {tournament.teams}
      </p>

      <p>
        <strong>📅 Duration:</strong> {tournament.duration}
      </p>

      <span
        className={`status ${
          tournament.status === "Ongoing"
            ? "ongoing"
            : tournament.status === "Upcoming"
            ? "upcoming"
            : "completed"
        }`}
      >
        {tournament.status}
      </span>

      <div className="card-actions">

        <button
          className="edit-btn"
          onClick={() => editTournament(tournament)}
        >
          ✏ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteTournament(tournament.id)}
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default TournamentCard;