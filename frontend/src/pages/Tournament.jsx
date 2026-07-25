import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TournamentForm from "../components/TournamentForm";
import TournamentCard from "../components/TournamentCard";
import { Plus, Search } from "lucide-react";

function Tournament() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
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

  const deleteTournament = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tournament?"
    );

    if (!confirmDelete) return;

    setTournaments(
      tournaments.filter((tournament) => tournament.id !== id)
    );
  };

  const editTournament = (tournament) => {
    setEditingTournament(tournament);
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
                🏆 Tournament Management
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                Create, organize, and monitor all your cricket tournaments and active leagues.
              </p>
            </div>

            <button
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-accent text-slate-100 font-bold hover:bg-blue-600 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
              onClick={() => {
                setEditingTournament(null);
                setShowForm(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Add Tournament
            </button>
          </div>

          {/* Search Box */}
          <div className="relative max-w-md text-left">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            </span>
            <input
              type="text"
              placeholder="Search tournaments by name..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-850 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Tournament Grid List */}
          {filteredTournaments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTournaments.map((tournament) => (
                <TournamentCard
                  key={tournament.id}
                  tournament={tournament}
                  deleteTournament={deleteTournament}
                  editTournament={editTournament}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 border border-slate-250 dark:border-slate-800 text-center max-w-md mx-auto mt-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-855 flex items-center justify-center mx-auto text-lg text-slate-400 dark:text-slate-550">
                🔍
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200">No tournaments found</h3>
                <p className="text-xs text-slate-500 dark:text-slate-450 font-semibold">Try another search term or click the add button above.</p>
              </div>
            </div>
          )}

          {/* Form Modal overlay */}
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

        </main>
      </div>
    </div>
  );
}

export default Tournament;