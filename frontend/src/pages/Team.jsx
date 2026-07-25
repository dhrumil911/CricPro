import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TeamCard from "../components/TeamCard";
import TeamForm from "../components/TeamForm";
import { Plus, Search } from "lucide-react";

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
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="absolute inset-0 pitch-texture opacity-30 pointer-events-none" />
        
        <Topbar />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 relative z-10">
          
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2 font-display">
                👥 Team Management
              </h1>
              <p className="text-slate-555 dark:text-slate-400 text-xs mt-1">
                Manage registered franchises, assign squad sizes, captains, and coaches.
              </p>
            </div>

            <button
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-accent text-slate-100 font-bold hover:bg-blue-600 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
              onClick={() => {
                setEditingTeam(null);
                setShowForm(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Add Team
            </button>
          </div>

          {/* Search Box */}
          <div className="relative max-w-md text-left">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-550" />
            </span>
            <input
              type="text"
              placeholder="Search teams by franchise name..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-850 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Teams Grid List */}
          {filteredTeams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
            <div className="glass-card rounded-2xl p-12 border border-slate-250 dark:border-slate-800 text-center max-w-md mx-auto mt-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-855 flex items-center justify-center mx-auto text-lg text-slate-400 dark:text-slate-550">
                🔍
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200">No teams found</h3>
                <p className="text-xs text-slate-505 dark:text-slate-450 font-semibold">Try another search keyword or create a new team.</p>
              </div>
            </div>
          )}

          {/* Form Modal overlay */}
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

        </main>
      </div>
    </div>
  );
}

export default Team;