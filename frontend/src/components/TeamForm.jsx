import { useEffect, useState } from "react";

function TeamForm({ teams, setTeams, closeForm, editingTeam }) {
  const [name, setName] = useState(editingTeam?.name || "");
  const [captain, setCaptain] = useState(editingTeam?.captain || "");
  const [city, setCity] = useState(editingTeam?.city || "");
  const [coach, setCoach] = useState(editingTeam?.coach || "");
  const [totalPlayers, setTotalPlayers] = useState(editingTeam?.totalPlayers || "");
  const [status, setStatus] = useState(editingTeam?.status || "Active");

  useEffect(() => {
    setName(editingTeam?.name || "");
    setCaptain(editingTeam?.captain || "");
    setCity(editingTeam?.city || "");
    setCoach(editingTeam?.coach || "");
    setTotalPlayers(editingTeam?.totalPlayers || "");
    setStatus(editingTeam?.status || "Active");
  }, [editingTeam]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !captain.trim() || !city.trim() || !coach.trim() || !totalPlayers || !status) {
      alert("Please fill all required fields before saving.");
      return;
    }

    const teamData = {
      name: name.trim(),
      captain: captain.trim(),
      city: city.trim(),
      coach: coach.trim(),
      totalPlayers: Number(totalPlayers),
      status,
    };

    if (editingTeam) {
      const updatedTeams = teams.map((team) =>
        team.id === editingTeam.id ? { ...team, ...teamData } : team
      );

      setTeams(updatedTeams);
      alert("Team updated successfully!");
    } else {
      const newTeam = {
        id: Date.now(),
        ...teamData,
      };

      setTeams([...teams, newTeam]);
      alert("Team added successfully!");
    }

    closeForm();
  };

  return (
    <div className="modal-overlay">
      <div className="team-form">
        <h2>{editingTeam ? "✏ Edit Team" : "🏏 Add Team"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Team Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Captain Name"
            value={captain}
            onChange={(e) => setCaptain(e.target.value)}
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="text"
            placeholder="Coach Name"
            value={coach}
            onChange={(e) => setCoach(e.target.value)}
          />

          <input
            type="number"
            min="1"
            placeholder="Total Players"
            value={totalPlayers}
            onChange={(e) => setTotalPlayers(e.target.value)}
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={closeForm}>
              Cancel
            </button>

            <button type="submit">
              {editingTeam ? "Update Team" : "Save Team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeamForm;