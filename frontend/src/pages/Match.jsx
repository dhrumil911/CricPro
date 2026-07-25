import { useState } from "react";
import Sidebar from "../components/Sidebar";
import MatchCard from "../components/MatchCard";
import MatchForm from "../components/MatchForm";
import "../styles/match.css";

function Match() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editingMatch, setEditingMatch] = useState(null);

  const [matches, setMatches] = useState([
    {
      id: 1,
      tournamentName: "IPL 2026",
      teamA: "Mumbai Indians",
      teamB: "Chennai Super Kings",
      matchDate: "2026-08-12",
      matchTime: "19:30",
      venue: "Wankhede Stadium",
      matchType: "League",
      umpire: "Anil Chaudhary",
      tossWinner: "Mumbai Indians",
      batFirst: "Mumbai Indians",
      status: "Upcoming",
    },
    {
      id: 2,
      tournamentName: "Champions Cup",
      teamA: "Royal Challengers Bengaluru",
      teamB: "Gujarat Titans",
      matchDate: "2026-07-30",
      matchTime: "20:00",
      venue: "M. Chinnaswamy Stadium",
      matchType: "Final",
      umpire: "Nitin Menon",
      tossWinner: "Gujarat Titans",
      batFirst: "Gujarat Titans",
      status: "Live",
    },
  ]);

  const filteredMatches = matches.filter((match) => {
    const searchText = search.toLowerCase();
    return (
      match.tournamentName.toLowerCase().includes(searchText) ||
      match.teamA.toLowerCase().includes(searchText) ||
      match.teamB.toLowerCase().includes(searchText)
    );
  });

  const deleteMatch = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this match?"
    );

    if (!confirmDelete) return;

    setMatches(matches.filter((match) => match.id !== id));
  };

  const editMatch = (match) => {
    setEditingMatch(match);
    setShowForm(true);
  };

  return (
    <div className="match-layout">
      <Sidebar />

      <div className="match-page">
        <div className="match-header">
          <div>
            <h1>📅 Match Scheduling</h1>
            <p>Plan and manage cricket matches from one place.</p>
          </div>

          <button
            className="add-btn"
            onClick={() => {
              setEditingMatch(null);
              setShowForm(true);
            }}
          >
            + Add Match
          </button>
        </div>

        <input
          type="text"
          placeholder="🔍 Search Match by Tournament or Team..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredMatches.length > 0 ? (
          <div className="match-list">
            {filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                deleteMatch={deleteMatch}
                editMatch={editMatch}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No matches found</h3>
            <p>Try another search term or add a new match.</p>
          </div>
        )}

        {showForm && (
          <MatchForm
            matches={matches}
            setMatches={setMatches}
            closeForm={() => {
              setShowForm(false);
              setEditingMatch(null);
            }}
            editingMatch={editingMatch}
          />
        )}
      </div>
    </div>
  );
}

export default Match;
