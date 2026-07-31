import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Filter, Calendar, Users, Trophy, BookOpen, TrendingUp } from "lucide-react";

function Reports() {
  const [selectedTournament, setSelectedTournament] = useState("All");
  const [selectedTeam, setSelectedTeam] = useState("All");

  const tournaments = [
    { id: 1, name: "IPL 2026", totalMatches: 74, completedMatches: 58, remainingMatches: 16, champion: "Mumbai Indians" },
    { id: 2, name: "Champions Cup", totalMatches: 24, completedMatches: 24, remainingMatches: 0, champion: "Royal Challengers Bengaluru" },
    { id: 3, name: "GPL 2026", totalMatches: 20, completedMatches: 12, remainingMatches: 8, champion: "Pending" },
  ];

  const teams = [
    { id: 1, name: "Mumbai Indians", matchesPlayed: 14, wins: 10, losses: 4, winPercentage: 71.4 },
    { id: 2, name: "Chennai Super Kings", matchesPlayed: 14, wins: 8, losses: 6, winPercentage: 57.1 },
    { id: 3, name: "Royal Challengers Bengaluru", matchesPlayed: 14, wins: 7, losses: 7, winPercentage: 50.0 },
    { id: 4, name: "Gujarat Titans", matchesPlayed: 14, wins: 7, losses: 7, winPercentage: 50.0 },
    { id: 5, name: "Delhi Capitals", matchesPlayed: 14, wins: 5, losses: 9, winPercentage: 35.7 },
  ];

  const players = [
    { id: 1, name: "Virat Kohli", runs: 12000, wickets: 4, strikeRate: 138.2, bowlingFigures: "0/34" },
    { id: 2, name: "Jasprit Bumrah", runs: 450, wickets: 220, strikeRate: 96.8, bowlingFigures: "5/21" },
    { id: 3, name: "Rohit Sharma", runs: 11000, wickets: 30, strikeRate: 132.5, bowlingFigures: "0/18" },
    { id: 4, name: "Ravindra Jadeja", runs: 5000, wickets: 180, strikeRate: 118.7, bowlingFigures: "4/33" },
    { id: 5, name: "Shubman Gill", runs: 7000, wickets: 8, strikeRate: 139.1, bowlingFigures: "2/45" },
  ];

  const matches = [
    { id: 1, tournament: "IPL 2026", teamA: "Mumbai Indians", teamB: "Chennai Super Kings", date: "2026-08-12", result: "MI won by 8 wickets", status: "Completed" },
    { id: 2, tournament: "Champions Cup", teamA: "Royal Challengers Bengaluru", teamB: "Gujarat Titans", date: "2026-07-30", result: "RCB won by 5 runs", status: "Completed" },
    { id: 3, tournament: "IPL 2026", teamA: "Delhi Capitals", teamB: "Mumbai Indians", date: "2026-08-16", result: "Pending", status: "Upcoming" },
    { id: 4, tournament: "GPL 2026", teamA: "Chennai Super Kings", teamB: "Gujarat Titans", date: "2026-08-18", result: "Live", status: "Live" },
    { id: 5, tournament: "Champions Cup", teamA: "Gujarat Titans", teamB: "Delhi Capitals", date: "2026-08-20", result: "Pending", status: "Upcoming" },
  ];

  const stats = useMemo(() => {
    const filteredMatches = matches.filter((match) => {
      const tournamentMatch = selectedTournament === "All" || match.tournament === selectedTournament;
      const teamMatch = selectedTeam === "All" || match.teamA === selectedTeam || match.teamB === selectedTeam;
      return tournamentMatch && teamMatch;
    });

    return {
      totalTournaments: tournaments.length,
      totalTeams: teams.length,
      totalPlayers: players.length,
      totalMatches: filteredMatches.length,
      completedMatches: filteredMatches.filter((m) => m.status === "Completed").length,
      upcomingMatches: filteredMatches.filter((m) => m.status === "Upcoming").length,
    };
  }, [selectedTournament, selectedTeam]);

  const tournamentStats = useMemo(() => {
    if (selectedTournament === "All") {
      return tournaments[0];
    }
    return tournaments.find((t) => t.name === selectedTournament) || tournaments[0];
  }, [selectedTournament]);

  const teamStats = useMemo(() => {
    if (selectedTeam === "All") {
      return teams[0];
    }
    return teams.find((team) => team.name === selectedTeam) || teams[0];
  }, [selectedTeam]);

  const recentMatches = useMemo(() => {
    return matches
      .filter((match) => {
        const tournamentMatch = selectedTournament === "All" || match.tournament === selectedTournament;
        const teamMatch = selectedTeam === "All" || match.teamA === selectedTeam || match.teamB === selectedTeam;
        return tournamentMatch && teamMatch;
      })
      .slice(0, 5);
  }, [selectedTournament, selectedTeam]);

  const topRunScorers = [...players].sort((a, b) => b.runs - a.runs).slice(0, 5);
  const topWicketTakers = [...players].sort((a, b) => b.wickets - a.wickets).slice(0, 5);
  const highestStrikeRate = [...players].sort((a, b) => b.strikeRate - a.strikeRate)[0];
  const bestBowlingFigures = [...players].sort((a, b) => {
    const aVal = Number(a.bowlingFigures.split("/")[1] || 0);
    const bVal = Number(b.bowlingFigures.split("/")[1] || 0);
    return aVal - bVal;
  })[0];

  const chartBars = teams.map((team) => ({ name: team.name.slice(0, 3).toUpperCase(), Wins: team.wins }));
  
  const statusCounts = [
    { name: "Upcoming", value: stats.upcomingMatches, color: "#facc15" },
    { name: "Live", value: matches.filter((m) => m.status === "Live").length, color: "#ef4444" },
    { name: "Completed", value: stats.completedMatches, color: "#22c55e" },
  ];

  const timeSeriesData = [
    { name: "Match 1", Matches: 8 },
    { name: "Match 2", Matches: 12 },
    { name: "Match 3", Matches: 14 },
    { name: "Match 4", Matches: 16 },
    { name: "Match 5", Matches: 18 },
  ];

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
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5 font-display">
                <TrendingUp className="w-6 h-6 text-accent dark:text-highlight shrink-0" />
                Reports & Statistics
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                Deep analytical breakdowns of tournaments, player career charts, and win metrics.
              </p>
            </div>

            {/* Filter Group */}
            <div className="flex items-center gap-2.5 shrink-0 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl px-3 py-1.5 w-full sm:w-auto shadow-sm">
              <Filter className="w-3.5 h-3.5 text-slate-550 dark:text-slate-455 shrink-0" />
              
              <select
                value={selectedTournament}
                onChange={(e) => setSelectedTournament(e.target.value)}
                className="bg-transparent text-slate-700 dark:text-slate-350 text-xs focus:outline-none cursor-pointer border-r border-slate-200 dark:border-slate-800 pr-2 mr-1 font-semibold"
              >
                <option value="All">All Tournaments</option>
                {tournaments.map((tournament) => (
                  <option key={tournament.id} value={tournament.name}>
                    {tournament.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="bg-transparent text-slate-700 dark:text-slate-350 text-xs focus:outline-none cursor-pointer font-semibold"
              >
                <option value="All">All Teams</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats Grid Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard title="Total Tournaments" value={stats.totalTournaments} icon="🏆" />
            <StatCard title="Total Teams" value={stats.totalTeams} icon="👥" />
            <StatCard title="Total Players" value={stats.totalPlayers} icon="🏏" />
            <StatCard title="Total Matches" value={stats.totalMatches} icon="📅" />
            <StatCard title="Completed Matches" value={stats.completedMatches} icon="✅" />
            <StatCard title="Upcoming Matches" value={stats.upcomingMatches} icon="⏳" />
          </div>

          {/* Panels Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-left">
            
            {/* Player Stats */}
            <div className="glass-card rounded-2xl p-6 border border-slate-250 dark:border-slate-800 space-y-4">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-850 pb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-accent" />
                Player Milestones
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="text-slate-500 dark:text-slate-400 font-semibold mb-2">Top Run Scorers</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300 pl-1">
                    {topRunScorers.map((player) => (
                      <li key={player.id} className="marker:text-accent font-medium">
                        {player.name} — <span className="font-bold text-slate-850 dark:text-slate-200">{player.runs.toLocaleString()} runs</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-850/50">
                  <h4 className="text-slate-500 dark:text-slate-400 font-semibold mb-2">Top Wicket Takers</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300 pl-1">
                    {topWicketTakers.map((player) => (
                      <li key={player.id} className="marker:text-danger font-medium">
                        {player.name} — <span className="font-bold text-slate-850 dark:text-slate-200">{player.wickets} wickets</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-850/50 grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Highest Strike Rate</h5>
                    <div className="font-display font-bold text-sm text-slate-850 dark:text-slate-200 mt-0.5">{highestStrikeRate?.strikeRate}</div>
                    <div className="text-[10px] text-slate-450">{highestStrikeRate?.name}</div>
                  </div>
                  <div>
                    <h5 className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Best Bowling Figures</h5>
                    <div className="font-display font-bold text-sm text-slate-850 dark:text-slate-200 mt-0.5">{bestBowlingFigures?.bowlingFigures}</div>
                    <div className="text-[10px] text-slate-450">{bestBowlingFigures?.name}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tournament Details */}
            <div className="glass-card rounded-2xl p-6 border border-slate-250 dark:border-slate-800 space-y-4">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-850 pb-2 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-highlight" />
                Tournament Review
              </h3>
              
              <div className="space-y-4 text-xs text-slate-550 dark:text-slate-400">
                <div className="p-3 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Tournament Name:</span>
                    <strong className="text-slate-850 dark:text-slate-200 font-display">{tournamentStats.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Matches:</span>
                    <span className="text-slate-750 dark:text-slate-300 font-semibold">{tournamentStats.totalMatches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed Matches:</span>
                    <span className="text-slate-750 dark:text-slate-300 font-semibold">{tournamentStats.completedMatches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining Fixtures:</span>
                    <span className="text-slate-750 dark:text-slate-300 font-semibold">{tournamentStats.remainingMatches}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wide block">Defending Champion</span>
                    <span className="font-display font-bold text-sm text-slate-850 dark:text-slate-200 mt-1">{tournamentStats.champion}</span>
                  </div>
                  <Trophy className="w-8 h-8 text-highlight/40 glow-gold rounded-full" />
                </div>
              </div>
            </div>

            {/* Team Details */}
            <div className="glass-card rounded-2xl p-6 border border-slate-250 dark:border-slate-800 space-y-4">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-850 pb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-accent" />
                Team Win Ratios
              </h3>

              <div className="space-y-4 text-xs text-slate-550 dark:text-slate-400">
                <div className="p-3 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Team Franchise:</span>
                    <strong className="text-slate-850 dark:text-slate-200 font-display">{teamStats.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Matches Played:</span>
                    <span className="text-slate-750 dark:text-slate-300 font-semibold">{teamStats.matchesPlayed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wins Logged:</span>
                    <span className="text-accent font-bold">{teamStats.wins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Losses Logged:</span>
                    <span className="text-danger font-semibold">{teamStats.losses}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-xl text-center space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wide block">Win Percentage</span>
                  <div className="font-display font-extrabold text-2xl text-slate-850 dark:text-slate-100">{teamStats.winPercentage.toFixed(1)}%</div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="bg-accent h-1.5 rounded-full" style={{ width: `${teamStats.winPercentage}%` }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Recharts Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Wins Bar Chart */}
            <div className="glass-card rounded-2xl p-5 border border-slate-250 dark:border-slate-800 flex flex-col h-[280px] text-left">
              <h3 className="font-display font-bold text-xs text-slate-700 dark:text-slate-350 uppercase tracking-wider mb-4">Wins Standings</h3>
              <div className="flex-1 w-full text-[9px] font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartBars} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                    <Bar dataKey="Wins" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Match Status Pie Chart */}
            <div className="glass-card rounded-2xl p-5 border border-slate-250 dark:border-slate-800 flex flex-col h-[280px] text-left">
              <h3 className="font-display font-bold text-xs text-slate-700 dark:text-slate-350 uppercase tracking-wider mb-4">Match Status Breakdowns</h3>
              <div className="flex-1 w-full text-[9px] font-semibold flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusCounts}
                      cx="50%"
                      cy="48%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {statusCounts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Line Chart */}
            <div className="glass-card rounded-2xl p-5 border border-slate-250 dark:border-slate-800 flex flex-col h-[280px] text-left">
              <h3 className="font-display font-bold text-xs text-slate-700 dark:text-slate-350 uppercase tracking-wider mb-4">Matches Over Time</h3>
              <div className="flex-1 w-full text-[9px] font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                    <Line type="monotone" dataKey="Matches" stroke="#2563eb" strokeWidth={2.5} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Recent Match Ticker */}
          <div className="glass-card rounded-2xl p-6 border border-slate-250 dark:border-slate-800 space-y-4 text-left">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-850 pb-2">
              Log Of Filtered Match Outcomes
            </h3>
            
            <div className="divide-y divide-slate-200 dark:divide-slate-850">
              {recentMatches.map((match) => (
                <div key={match.id} className="py-3 flex justify-between items-center text-xs hover:bg-slate-100/50 dark:hover:bg-slate-900/10 px-2 rounded-xl transition-colors">
                  <div className="space-y-0.5">
                    <strong className="text-slate-850 dark:text-slate-200">{match.teamA} vs {match.teamB}</strong>
                    <span className="text-[10px] text-slate-500 block">{match.tournament}</span>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-slate-655 dark:text-slate-300 font-bold">{match.result}</span>
                    <span className={`text-[9px] px-2 py-0.5 border rounded-full font-bold block w-fit ml-auto ${
                      match.status === "Live"
                        ? "bg-red-500/10 text-danger border-red-500/20"
                        : match.status === "Completed"
                        ? "bg-green-500/10 text-accent border-green-500/20"
                        : "bg-yellow-500/10 text-highlight border-yellow-500/20"
                    }`}>
                      {match.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Reports;
