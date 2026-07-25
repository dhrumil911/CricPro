import { useEffect, useState } from "react";

function PlayerForm({ players, setPlayers, closeForm, editingPlayer }) {
  const [name, setName] = useState(editingPlayer?.name || "");
  const [teamName, setTeamName] = useState(editingPlayer?.teamName || "");
  const [jerseyNumber, setJerseyNumber] = useState(editingPlayer?.jerseyNumber || "");
  const [role, setRole] = useState(editingPlayer?.role || "Batsman");
  const [battingStyle, setBattingStyle] = useState(editingPlayer?.battingStyle || "");
  const [bowlingStyle, setBowlingStyle] = useState(editingPlayer?.bowlingStyle || "");
  const [age, setAge] = useState(editingPlayer?.age || "");
  const [matches, setMatches] = useState(editingPlayer?.matches || "");
  const [runs, setRuns] = useState(editingPlayer?.runs || "");
  const [wickets, setWickets] = useState(editingPlayer?.wickets || "");
  const [status, setStatus] = useState(editingPlayer?.status || "Active");

  useEffect(() => {
    setName(editingPlayer?.name || "");
    setTeamName(editingPlayer?.teamName || "");
    setJerseyNumber(editingPlayer?.jerseyNumber || "");
    setRole(editingPlayer?.role || "Batsman");
    setBattingStyle(editingPlayer?.battingStyle || "");
    setBowlingStyle(editingPlayer?.bowlingStyle || "");
    setAge(editingPlayer?.age || "");
    setMatches(editingPlayer?.matches || "");
    setRuns(editingPlayer?.runs || "");
    setStatus(editingPlayer?.status || "Active");
    setWickets(editingPlayer?.wickets || "");
  }, [editingPlayer]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !teamName.trim() ||
      !jerseyNumber ||
      !role ||
      !battingStyle.trim() ||
      !bowlingStyle.trim() ||
      !age ||
      !matches ||
      !runs ||
      !wickets ||
      !status
    ) {
      alert("Please fill all required fields before saving.");
      return;
    }

    const playerData = {
      name: name.trim(),
      teamName: teamName.trim(),
      jerseyNumber: Number(jerseyNumber),
      role,
      battingStyle: battingStyle.trim(),
      bowlingStyle: bowlingStyle.trim(),
      age: Number(age),
      matches: Number(matches),
      runs: Number(runs),
      wickets: Number(wickets),
      status,
    };

    if (editingPlayer) {
      const updatedPlayers = players.map((player) =>
        player.id === editingPlayer.id ? { ...player, ...playerData } : player
      );

      setPlayers(updatedPlayers);
      alert("Player updated successfully!");
    } else {
      const newPlayer = {
        id: Date.now(),
        ...playerData,
      };

      setPlayers([...players, newPlayer]);
      alert("Player added successfully!");
    }

    closeForm();
  };

  return (
    <div className="modal-overlay">
      <div className="player-form">
        <h2>{editingPlayer ? "✏ Edit Player" : "🏏 Add Player"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Player Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Jersey Number"
            value={jerseyNumber}
            onChange={(e) => setJerseyNumber(e.target.value)}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-Rounder">All-Rounder</option>
            <option value="Wicket Keeper">Wicket Keeper</option>
          </select>

          <input
            type="text"
            placeholder="Batting Style"
            value={battingStyle}
            onChange={(e) => setBattingStyle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Bowling Style"
            value={bowlingStyle}
            onChange={(e) => setBowlingStyle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="number"
            placeholder="Matches"
            value={matches}
            onChange={(e) => setMatches(e.target.value)}
          />

          <input
            type="number"
            placeholder="Runs"
            value={runs}
            onChange={(e) => setRuns(e.target.value)}
          />

          <input
            type="number"
            placeholder="Wickets"
            value={wickets}
            onChange={(e) => setWickets(e.target.value)}
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
              {editingPlayer ? "Update Player" : "Save Player"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlayerForm;
