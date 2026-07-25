import { useState } from "react";
import Sidebar from "../components/Sidebar";
import PlayerCard from "../components/PlayerCard";
import PlayerForm from "../components/PlayerForm";
import "../styles/player.css";

function Player() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editingPlayer, setEditingPlayer] = useState(null);

  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "Virat Kohli",
      teamName: "Royal Challengers Bengaluru",
      jerseyNumber: 18,
      role: "Batsman",
      battingStyle: "Right-hand bat",
      bowlingStyle: "Right-arm medium",
      age: 35,
      matches: 250,
      runs: 12000,
      wickets: 4,
      status: "Active",
    },
    {
      id: 2,
      name: "Jasprit Bumrah",
      teamName: "Mumbai Indians",
      jerseyNumber: 93,
      role: "Bowler",
      battingStyle: "Right-hand bat",
      bowlingStyle: "Right-arm fast",
      age: 30,
      matches: 180,
      runs: 450,
      wickets: 220,
      status: "Active",
    },
    {
      id: 3,
      name: "Hardik Pandya",
      teamName: "Mumbai Indians",
      jerseyNumber: 33,
      role: "All-Rounder",
      battingStyle: "Right-hand bat",
      bowlingStyle: "Right-arm fast",
      age: 30,
      matches: 160,
      runs: 3500,
      wickets: 90,
      status: "Inactive",
    },
  ]);

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  const deletePlayer = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this player?"
    );

    if (!confirmDelete) return;

    setPlayers(players.filter((player) => player.id !== id));
  };

  const editPlayer = (player) => {
    setEditingPlayer(player);
    setShowForm(true);
  };

  return (
    <div className="player-layout">
      <Sidebar />

      <div className="player-page">
        <div className="player-header">
          <div>
            <h1>🏏 Player Management</h1>
            <p>Manage all cricket players from one place.</p>
          </div>

          <button
            className="add-btn"
            onClick={() => {
              setEditingPlayer(null);
              setShowForm(true);
            }}
          >
            + Add Player
          </button>
        </div>

        <input
          type="text"
          placeholder="🔍 Search Player..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredPlayers.length > 0 ? (
          <div className="player-list">
            {filteredPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                deletePlayer={deletePlayer}
                editPlayer={editPlayer}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No players found</h3>
            <p>Try another search term or add a new player.</p>
          </div>
        )}

        {showForm && (
          <PlayerForm
            players={players}
            setPlayers={setPlayers}
            closeForm={() => {
              setShowForm(false);
              setEditingPlayer(null);
            }}
            editingPlayer={editingPlayer}
          />
        )}
      </div>
    </div>
  );
}

export default Player;
