import { useEffect, useState } from "react";

function MatchForm({ matches, setMatches, closeForm, editingMatch }) {
  const [tournamentName, setTournamentName] = useState(editingMatch?.tournamentName || "");
  const [teamA, setTeamA] = useState(editingMatch?.teamA || "");
  const [teamB, setTeamB] = useState(editingMatch?.teamB || "");
  const [matchDate, setMatchDate] = useState(editingMatch?.matchDate || "");
  const [matchTime, setMatchTime] = useState(editingMatch?.matchTime || "");
  const [venue, setVenue] = useState(editingMatch?.venue || "");
  const [matchType, setMatchType] = useState(editingMatch?.matchType || "League");
  const [umpire, setUmpire] = useState(editingMatch?.umpire || "");
  const [tossWinner, setTossWinner] = useState(editingMatch?.tossWinner || "");
  const [batFirst, setBatFirst] = useState(editingMatch?.batFirst || "");
  const [status, setStatus] = useState(editingMatch?.status || "Upcoming");

  useEffect(() => {
    setTournamentName(editingMatch?.tournamentName || "");
    setTeamA(editingMatch?.teamA || "");
    setTeamB(editingMatch?.teamB || "");
    setMatchDate(editingMatch?.matchDate || "");
    setMatchTime(editingMatch?.matchTime || "");
    setVenue(editingMatch?.venue || "");
    setMatchType(editingMatch?.matchType || "League");
    setUmpire(editingMatch?.umpire || "");
    setTossWinner(editingMatch?.tossWinner || "");
    setBatFirst(editingMatch?.batFirst || "");
    setStatus(editingMatch?.status || "Upcoming");
  }, [editingMatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !tournamentName.trim() ||
      !teamA.trim() ||
      !teamB.trim() ||
      !matchDate ||
      !matchTime ||
      !venue.trim() ||
      !matchType ||
      !umpire.trim() ||
      !tossWinner.trim() ||
      !batFirst.trim() ||
      !status
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (teamA.trim() === teamB.trim()) {
      alert("Team A and Team B cannot be the same.");
      return;
    }

    const matchData = {
      tournamentName: tournamentName.trim(),
      teamA: teamA.trim(),
      teamB: teamB.trim(),
      matchDate,
      matchTime,
      venue: venue.trim(),
      matchType,
      umpire: umpire.trim(),
      tossWinner: tossWinner.trim(),
      batFirst: batFirst.trim(),
      status,
    };

    if (editingMatch) {
      const updatedMatches = matches.map((match) =>
        match.id === editingMatch.id ? { ...match, ...matchData } : match
      );

      setMatches(updatedMatches);
      alert("Match updated successfully!");
    } else {
      const newMatch = {
        id: Date.now(),
        ...matchData,
      };

      setMatches([...matches, newMatch]);
      alert("Match added successfully!");
    }

    closeForm();
  };

  return (
    <div className="modal-overlay">
      <div className="match-form">
        <h2>{editingMatch ? "✏ Edit Match" : "📅 Add Match"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tournament Name"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Team A"
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
          />

          <input
            type="text"
            placeholder="Team B"
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
          />

          <input
            type="date"
            value={matchDate}
            onChange={(e) => setMatchDate(e.target.value)}
          />

          <input
            type="time"
            value={matchTime}
            onChange={(e) => setMatchTime(e.target.value)}
          />

          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />

          <select value={matchType} onChange={(e) => setMatchType(e.target.value)}>
            <option value="League">League</option>
            <option value="Knockout">Knockout</option>
            <option value="Final">Final</option>
          </select>

          <input
            type="text"
            placeholder="Umpire"
            value={umpire}
            onChange={(e) => setUmpire(e.target.value)}
          />

          <input
            type="text"
            placeholder="Toss Winner"
            value={tossWinner}
            onChange={(e) => setTossWinner(e.target.value)}
          />

          <input
            type="text"
            placeholder="Bat First"
            value={batFirst}
            onChange={(e) => setBatFirst(e.target.value)}
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Upcoming">Upcoming</option>
            <option value="Live">Live</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={closeForm}>
              Cancel
            </button>

            <button type="submit">
              {editingMatch ? "Update Match" : "Save Match"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MatchForm;
