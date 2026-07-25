function TeamCard() {
  return (
    <div className="team-card">

      <h2>🦁 Gujarat Lions</h2>

      <p>
        <strong>👤 Captain:</strong> Hardik Pandya
      </p>

      <p>
        <strong>🏏 Coach:</strong> Ashish Nehra
      </p>

      <p>
        <strong>📍 Home Ground:</strong> Narendra Modi Stadium
      </p>

      <p>
        <strong>👥 Players:</strong> 15
      </p>

      <div className="card-actions">

        <button className="edit-btn">
          ✏ Edit
        </button>

        <button className="delete-btn">
          🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default TeamCard;