import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TournamentForm from "../components/TournamentForm";
import TournamentCard from "../components/TournamentCard";
import "../styles/tournament.css";

function Tournament() {

  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");

  // NEW
  const [editingTournament, setEditingTournament] = useState(null);

  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      name: "IPL 2026",
      type: "League",
      venue: "Ahmedabad",
      teams: 12,
      duration: "28 Mar - 24 May",
      status: "Ongoing",
    },
    {
      id: 2,
      name: "GPL 2026",
      type: "Knockout",
      venue: "Surat",
      teams: 16,
      duration: "10 Apr - 28 Apr",
      status: "Upcoming",
    },
    {
      id: 3,
      name: "Champions Cup",
      type: "League",
      venue: "Rajkot",
      teams: 8,
      duration: "01 Jan - 20 Jan",
      status: "Completed",
    },
  ]);

  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.name.toLowerCase().includes(search.toLowerCase())
  );

  // Delete Tournament
  const deleteTournament = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tournament?"
    );

    if (!confirmDelete) return;

    setTournaments(
      tournaments.filter((tournament) => tournament.id !== id)
    );
  };

  // NEW - Edit Tournament
  const editTournament = (tournament) => {
    setEditingTournament(tournament);
    setShowForm(true);
  };

  return (
    <div className="tournament-layout">

      <Sidebar />

      <div className="tournament-page">

        <div className="tournament-header">

          <div>
            <h1>🏆 Tournament Management</h1>
            <p>Manage all cricket tournaments from one place.</p>
          </div>

          <button
            className="add-btn"
            onClick={() => {
              setEditingTournament(null);
              setShowForm(true);
            }}
          >
            + Add Tournament
          </button>

        </div>

        <input
          type="text"
          placeholder="🔍 Search Tournament..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="tournament-list">

          {filteredTournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              deleteTournament={deleteTournament}
              editTournament={editTournament}
            />
          ))}

        </div>

        {showForm && (
          <TournamentForm
            tournaments={tournaments}
            setTournaments={setTournaments}
            closeForm={() => {
              setShowForm(false);
              setEditingTournament(null);
            }}
            editingTournament={editingTournament}
          />
        )}

      </div>

    </div>
  );
}

export default Tournament;