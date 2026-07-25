import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MatchCard from "../components/MatchCard";
import MatchForm from "../components/MatchForm";
import { Plus, Search } from "lucide-react";

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
                📅 Match Scheduling
              </h1>
              <p className="text-slate-555 dark:text-slate-400 text-xs mt-1">
                Create new fixtures, assign umpires and toss information, and monitor live matches.
              </p>
            </div>

            <button
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-accent text-slate-100 font-bold hover:bg-blue-600 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
              onClick={() => {
                setEditingMatch(null);
                setShowForm(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Add Match
            </button>
          </div>

          {/* Search Box */}
          <div className="relative max-w-md text-left">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-550" />
            </span>
            <input
              type="text"
              placeholder="Search matches by tournament or franchise..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-855 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Matches Grid List */}
          {filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
            <div className="glass-card rounded-2xl p-12 border border-slate-250 dark:border-slate-800 text-center max-w-md mx-auto mt-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-855 flex items-center justify-center mx-auto text-lg text-slate-400 dark:text-slate-550">
                🔍
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200">No matches found</h3>
                <p className="text-xs text-slate-505 dark:text-slate-450 font-semibold">Try another search keyword or create a new fixture.</p>
              </div>
            </div>
          )}

          {/* Form Modal overlay */}
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

        </main>
      </div>
    </div>
  );
}

export default Match;
