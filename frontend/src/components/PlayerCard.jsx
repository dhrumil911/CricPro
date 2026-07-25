function PlayerCard({ player, deletePlayer, editPlayer }) {
  return (
    <div className="player-card">
      <div className="card-top">
        <h2>🏏 {player.name}</h2>
        <span className={`status ${player.status === "Active" ? "active" : "inactive"}`}>
          {player.status}
        </span>
      </div>

      <p>
        <strong>👥 Team:</strong> {player.teamName}
      </p>

      <p>
        <strong>🔢 Jersey:</strong> {player.jerseyNumber}
      </p>

      <p>
        <strong>🎯 Role:</strong> {player.role}
      </p>

      <p>
        <strong>🏏 Batting Style:</strong> {player.battingStyle}
      </p>

      <p>
        <strong>⚡ Bowling Style:</strong> {player.bowlingStyle}
      </p>

      <p>
        <strong>🎂 Age:</strong> {player.age}
      </p>

      <p>
        <strong>📊 Matches:</strong> {player.matches}
      </p>

      <p>
        <strong>🏁 Runs:</strong> {player.runs}
      </p>

      <p>
        <strong>🎳 Wickets:</strong> {player.wickets}
      </p>

      <div className="card-actions">
        <button className="edit-btn" onClick={() => editPlayer(player)}>
          ✏ Edit
        </button>

        <button className="delete-btn" onClick={() => deletePlayer(player.id)}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default PlayerCard;
