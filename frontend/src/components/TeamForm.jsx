function TeamForm() {
  return (
    <div className="team-form">

      <h2>Add Team</h2>

      <input
        type="text"
        placeholder="Team Name"
      />

      <input
        type="text"
        placeholder="Captain Name"
      />

      <input
        type="text"
        placeholder="Coach Name"
      />

      <input
        type="text"
        placeholder="Home Ground"
      />

      <input
        type="number"
        placeholder="Total Players"
      />

      <button>
        Save Team
      </button>

    </div>
  );
}

export default TeamForm;