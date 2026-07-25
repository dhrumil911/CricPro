import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import PointsTableRow from "../components/PointsTableRow";
import { Search, SlidersHorizontal } from "lucide-react";

function PointsTable() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("points");

  const teams = useMemo(
    () => [
      {
        id: 1,
        name: "Mumbai Indians",
        matchesPlayed: 14,
        wins: 10,
        losses: 4,
        ties: 0,
        noResult: 0,
        points: 20,
        nrr: 0.842,
      },
      {
        id: 2,
        name: "Chennai Super Kings",
        matchesPlayed: 14,
        wins: 8,
        losses: 6,
        ties: 0,
        noResult: 0,
        points: 16,
        nrr: 0.421,
      },
      {
        id: 3,
        name: "Royal Challengers Bengaluru",
        matchesPlayed: 14,
        wins: 7,
        losses: 7,
        ties: 0,
        noResult: 0,
        points: 14,
        nrr: 0.103,
      },
      {
        id: 4,
        name: "Gujarat Titans",
        matchesPlayed: 14,
        wins: 7,
        losses: 7,
        ties: 0,
        noResult: 0,
        points: 14,
        nrr: 0.092,
      },
      {
        id: 5,
        name: "Delhi Capitals",
        matchesPlayed: 14,
        wins: 5,
        losses: 9,
        ties: 0,
        noResult: 0,
        points: 10,
        nrr: -0.312,
      },
      {
        id: 6,
        name: "Kolkata Knight Riders",
        matchesPlayed: 14,
        wins: 6,
        losses: 8,
        ties: 0,
        noResult: 0,
        points: 12,
        nrr: -0.218,
      },
    ],
    []
  );

  const filteredAndSortedTeams = useMemo(() => {
    const filtered = teams.filter((team) =>
      team.name.toLowerCase().includes(search.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "nrr") {
        return b.nrr - a.nrr;
      }
      return b.points - a.points;
    });
  }, [search, sortBy, teams]);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="absolute inset-0 pitch-texture opacity-30 pointer-events-none" />
        
        <Topbar />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 relative z-10">
          
          {/* Header Row */}
          <div className="text-left">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2 font-display">
              📊 Points Table
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              Live league standings, net run rate metrics, and qualification standings.
            </p>
          </div>

          {/* Controls bar */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 text-left">
            <div className="relative max-w-sm flex-1">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </span>
              <input
                type="text"
                placeholder="Search team franchise..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-855 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2.5 shrink-0 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-1.5 shadow-sm">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 dark:text-slate-450" />
              <select
                className="bg-transparent text-slate-700 dark:text-slate-300 text-xs focus:outline-none cursor-pointer pr-1 font-semibold"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="points">Sort by Points</option>
                <option value="nrr">Sort by Net Run Rate (NRR)</option>
              </select>
            </div>
          </div>

          {/* Table Grid */}
          <div className="glass-card rounded-2xl border border-slate-250 dark:border-slate-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-450 font-bold uppercase tracking-wider">
                    <th className="px-4 py-3">Pos</th>
                    <th className="px-4 py-3">Team Name</th>
                    <th className="px-4 py-3">Matches</th>
                    <th className="px-4 py-3">Wins</th>
                    <th className="px-4 py-3">Losses</th>
                    <th className="px-4 py-3">Ties</th>
                    <th className="px-4 py-3">NR</th>
                    <th className="px-4 py-3">Points</th>
                    <th className="px-4 py-3">NRR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-850">
                  {filteredAndSortedTeams.map((team, index) => (
                    <PointsTableRow
                      key={team.id}
                      team={team}
                      position={index + 1}
                      isQualified={index < 4}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 bg-slate-100/30 dark:bg-slate-900/20 border-t border-slate-200 dark:border-slate-850 flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-500 font-semibold text-left">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
              <span>Highlighted teams qualify for Playoffs (Top 4 spots).</span>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default PointsTable;
