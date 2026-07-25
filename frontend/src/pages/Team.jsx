import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TeamCard from "../components/TeamCard";
import TeamForm from "../components/TeamForm";
import "../styles/team.css";

function Team() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editingTeam, setEditingTeam] = useState(null);

  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Mumbai Indians",
      captain: "Rohit Sharma",
      city: "Mumbai",
      coach: "Mahela Jayawardene",
      totalPlayers: 15,
      status: "Active",
    },
    {
      id: 2,
      name: "Chennai Super Kings",
      captain: "MS Dhoni",
      city: "Chennai",
      coach: "Stephen Fleming",
      totalPlayers: 15,
      status: "Active",
    },
    {
      id: 3,
      name: "Royal Challengers Bengaluru",
      captain: "Faf du Plessis",
      city: "Bengaluru",
      coach: "Andy Flower",
      totalPlayers: 15,
      status: "Inactive",
    },
  ]);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteTeam = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team?"
    );

    if (!confirmDelete) return;

    setTeams(teams.filter((team) => team.id !== id));
  };

  const editTeam = (team) => {
    setEditingTeam(team);
    setShowForm(true);
  };

  return (
    <div className="team-layout">
      <Sidebar />

      <div className="team-page">
        <div className="team-header">
          <div>
            <h1>👥 Team Management</h1>
            <p>Manage all cricket teams from one place.</p>
          </div>

          <button
            className="add-btn"
            onClick={() => {
              setEditingTeam(null);
              setShowForm(true);
            }}
          >
            + Add Team
          </button>
        </div>

        <input
          type="text"
          placeholder="🔍 Search Team..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredTeams.length > 0 ? (
          <div className="team-list">
            {filteredTeams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                deleteTeam={deleteTeam}
                editTeam={editTeam}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No teams found</h3>
            <p>Try a different keyword or add a new team.</p>
          </div>
        )}

        {showForm && (
          <TeamForm
            teams={teams}
            setTeams={setTeams}
            closeForm={() => {
              setShowForm(false);
              setEditingTeam(null);
            }}
            editingTeam={editingTeam}
          />
        )}
      </div>
    </div>
  );
}

export default Team;