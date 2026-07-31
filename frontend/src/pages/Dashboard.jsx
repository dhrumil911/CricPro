import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardCard from "../components/DashboardCard";
import QuickAction from "../components/QuickAction";
import {
  getDashboardStats,
  getDashboardMatches,
  getDashboardLeaders,
  getDashboardCharts
} from "../services/api.js";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import {
  Calendar,
  History,
  Trophy,
  TrendingUp,
  Award,
  Star,
  Zap,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Dynamic States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    tournaments: 0,
    teams: 0,
    players: 0,
    matches: 0,
    completed: 0,
    upcoming: 0,
    live: 0
  });
  const [matches, setMatches] = useState({
    recent: [],
    upcoming: [],
    live: null
  });
  const [leaders, setLeaders] = useState({
    topScorer: null,
    topWicketTaker: null,
    mostSixes: null,
    mostFours: null,
    bestStrikeRate: null,
    bestEconomy: null
  });
  const [charts, setCharts] = useState({
    growthData: [],
    teamPerformanceData: [],
    matchStatusData: [],
    playerRoleData: []
  });

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");

  // Show short toast notification
  const triggerToast = (msg, type = "info") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  // Fetch Dashboard datasets from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError("");
      try {
        const [statsRes, matchesRes, leadersRes, chartsRes] = await Promise.all([
          getDashboardStats(),
          getDashboardMatches(),
          getDashboardLeaders(),
          getDashboardCharts()
        ]);

        if (statsRes.success) setStats(statsRes.stats);
        if (matchesRes.success) setMatches(matchesRes.matches);
        if (leadersRes.success) setLeaders(leadersRes.leaders);
        if (chartsRes.success) setCharts(chartsRes.charts);

        triggerToast("Dashboard data loaded successfully", "success");
      } catch (err) {
        console.error("Dashboard integration error:", err);
        setError(
          err.response?.data?.message || "Failed to load dashboard data. Connecting to backend fallback API..."
        );
        triggerToast("Failed to fetch latest API states", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Standard Colors for Pie/Cell charts
  const roleColors = ["#2563eb", "#eab308", "#ef4444", "#a855f7"];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300 relative">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Repeating Pitch pattern for background */}
        <div className="absolute inset-0 pitch-texture opacity-30 pointer-events-none" />
        
        <Topbar />

        {/* Global Toast Alert */}
        {toastMessage && (
          <div className={`fixed top-4 right-4 z-50 px-4.5 py-3 rounded-xl shadow-lg border text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
            toastType === "success" 
              ? "bg-green-500/10 border-green-500/35 text-green-500"
              : toastType === "error"
              ? "bg-red-500/10 border-red-500/35 text-danger"
              : "bg-blue-500/10 border-blue-500/35 text-accent"
          }`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            {toastMessage}
          </div>
        )}

        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 relative z-10">
          
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-left">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
                CricPro Dashboard
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                Monitor stats, active matches, team standouts, and live registration charts.
              </p>
            </div>
            {loading ? (
              <div className="h-6 w-32 animate-pulse bg-slate-200 dark:bg-slate-800/80 rounded-full" />
            ) : error ? (
              <div className="text-xs text-yellow-600 dark:text-highlight font-bold px-3.5 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                API OFFLINE
              </div>
            ) : (
              <div className="text-xs text-accent dark:text-highlight font-bold px-3.5 py-1.5 bg-accent/10 dark:bg-highlight/10 border border-accent/20 dark:border-highlight/20 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-accent dark:bg-highlight rounded-full animate-ping" />
                Live SQL Server Online
              </div>
            )}
          </div>

          {/* Database connection failure warning */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
              <div className="space-y-1">
                <h3 className="font-bold text-xs text-danger flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Database Connection Error
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-450 leading-relaxed max-w-2xl">
                  {error}. Dashboard is displaying placeholder states because SQL pool queries failed to resolve.
                </p>
              </div>
            </div>
          )}

          {/* Responsive Summary Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {loading ? (
              Array(6).fill(0).map((_, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-250 dark:border-slate-800/85 h-24 animate-pulse flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                  </div>
                </div>
              ))
            ) : (
              <>
                <DashboardCard number={stats.tournaments} title="Tournaments" />
                <DashboardCard number={stats.teams} title="Teams" />
                <DashboardCard number={stats.players} title="Players" />
                <DashboardCard number={stats.matches} title="Matches" />
                <DashboardCard number={stats.completed} title="Completed Matches" />
                <DashboardCard number={stats.upcoming} title="Upcoming Matches" />
              </>
            )}
          </div>

          {/* Quick Actions Grid */}
          <div className="text-left">
            <h2 className="text-[10px] font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest mb-3.5">Quick Operations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickAction title="Add Tournament" link="/tournaments" />
              <QuickAction title="Add Team" link="/teams" />
              <QuickAction title="Add Player" link="/players" />
              <QuickAction title="Schedule Match" link="/matches" />
            </div>
          </div>

          {/* Live Match Tracker widget */}
          {matches.live && (
            <div className="glass-card p-6 rounded-2xl border border-slate-250 dark:border-slate-800 text-left relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-red-500/80" />
              <div className="flex justify-between items-center mb-4">
                <span className="flex items-center gap-1.5 text-[9px] uppercase font-extrabold tracking-widest text-danger px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  Live Broadcast Telemetry
                </span>
                <span className="text-[10px] font-semibold text-slate-500">{matches.live.tournamentName}</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4 bg-slate-100/50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-850 flex-1 justify-center md:justify-start">
                  <span className="text-xs font-bold text-slate-850 dark:text-slate-200">{matches.live.teamA}</span>
                  <span className="px-2 py-0.5 text-[9px] font-bold text-highlight bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-850 rounded">VS</span>
                  <span className="text-xs font-bold text-slate-850 dark:text-slate-200">{matches.live.teamB}</span>
                </div>
                <div className="text-center md:text-left flex-1 space-y-1">
                  <div className="text-xs text-slate-500 uppercase font-semibold">Active score summary</div>
                  <div className="font-display font-extrabold text-base text-slate-800 dark:text-slate-100">
                    {matches.live.team_a_score || "N/A"} • {matches.live.team_b_score || "N/A"} <span className="text-xs text-slate-400 font-normal">({matches.live.overs} overs)</span>
                  </div>
                  <p className="text-[10px] text-accent font-bold mt-1">{matches.live.result}</p>
                </div>
              </div>
            </div>
          )}

          {/* Recharts Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
            {/* Matches per Month / Tournament Growth */}
            <div className="glass-card rounded-2xl p-5 border border-slate-250 dark:border-slate-800 flex flex-col h-[300px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-xs text-slate-700 dark:text-slate-350 uppercase tracking-wider">Matches per Month</h3>
                <TrendingUp className="w-4 h-4 text-accent dark:text-highlight" />
              </div>
              <div className="flex-1 w-full text-[9px] font-mono">
                {loading ? (
                  <div className="w-full h-full bg-slate-200/50 dark:bg-slate-800/40 rounded-xl animate-pulse" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={charts.growthData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorMatches" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" allowDecimals={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                      <Area type="monotone" dataKey="Tournaments" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorMatches)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Team Performance Wins */}
            <div className="glass-card rounded-2xl p-5 border border-slate-250 dark:border-slate-800 flex flex-col h-[300px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-xs text-slate-700 dark:text-slate-350 uppercase tracking-wider">Team Performance (Wins)</h3>
                <Trophy className="w-4 h-4 text-accent dark:text-highlight" />
              </div>
              <div className="flex-1 w-full text-[9px] font-mono">
                {loading ? (
                  <div className="w-full h-full bg-slate-200/50 dark:bg-slate-800/40 rounded-xl animate-pulse" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={charts.teamPerformanceData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" allowDecimals={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                      <Bar dataKey="Wins" fill="#2563eb" radius={[4, 4, 0, 0]}>
                        {charts.teamPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || "#2563eb"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Match Status breakdown */}
            <div className="glass-card rounded-2xl p-5 border border-slate-250 dark:border-slate-800 flex flex-col h-[300px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-xs text-slate-700 dark:text-slate-350 uppercase tracking-wider">Match Status breakdown</h3>
                <Calendar className="w-4 h-4 text-accent dark:text-highlight" />
              </div>
              <div className="flex-1 w-full text-[9px] font-semibold flex items-center justify-center">
                {loading ? (
                  <div className="w-full h-full bg-slate-200/50 dark:bg-slate-800/40 rounded-xl animate-pulse" />
                ) : charts.matchStatusData.length === 0 ? (
                  <div className="text-slate-450 dark:text-slate-500 font-bold">No Match records registered</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={charts.matchStatusData}
                        cx="50%"
                        cy="48%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {charts.matchStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || roleColors[index % roleColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Player registration distribution */}
            <div className="glass-card rounded-2xl p-5 border border-slate-250 dark:border-slate-800 flex flex-col h-[300px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-xs text-slate-700 dark:text-slate-350 uppercase tracking-wider">Player Role Distribution</h3>
                <Award className="w-4 h-4 text-accent dark:text-highlight" />
              </div>
              <div className="flex-1 w-full text-[9px] font-semibold flex items-center justify-center">
                {loading ? (
                  <div className="w-full h-full bg-slate-200/50 dark:bg-slate-800/40 rounded-xl animate-pulse" />
                ) : charts.playerRoleData.length === 0 ? (
                  <div className="text-slate-450 dark:text-slate-500 font-bold">No Player records registered</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={charts.playerRoleData}
                        cx="50%"
                        cy="48%"
                        innerRadius={0}
                        outerRadius={75}
                        paddingAngle={1}
                        dataKey="value"
                      >
                        {charts.playerRoleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={roleColors[index % roleColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          {/* Lower Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            
            {/* Recent & Upcoming Matches lists */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-250 dark:border-slate-800 space-y-6">
              
              {/* Recent completed */}
              <div>
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-850 pb-3 mb-4">
                  <History className="w-4.5 h-4.5 text-accent dark:text-highlight shrink-0" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">Recent Completed Matches</h3>
                </div>
                <div className="space-y-3">
                  {loading ? (
                    Array(2).fill(0).map((_, idx) => (
                      <div key={idx} className="h-16 bg-slate-200/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-xl animate-pulse" />
                    ))
                  ) : matches.recent.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-450 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">No completed match summaries found.</div>
                  ) : (
                    matches.recent.map((m, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-855 rounded-xl hover:border-slate-300 dark:hover:border-slate-800 transition-colors">
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-slate-850 dark:text-slate-200">{m.teams}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-500 font-semibold">{m.date} at {m.time} • {m.tournamentName}</div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-xs text-accent dark:text-accent font-bold">{m.result}</div>
                          <span className="text-[9px] px-2 py-0.5 rounded bg-green-500/10 text-green-500 dark:text-green-400 font-bold border border-green-500/20">Completed</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Upcoming fixtures */}
              <div>
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-850 pb-3 mb-4">
                  <Calendar className="w-4.5 h-4.5 text-accent dark:text-highlight shrink-0" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">Upcoming Fixtures</h3>
                </div>
                <div className="space-y-3">
                  {loading ? (
                    Array(2).fill(0).map((_, idx) => (
                      <div key={idx} className="h-16 bg-slate-200/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-xl animate-pulse" />
                    ))
                  ) : matches.upcoming.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-450 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">No upcoming fixtures scheduled.</div>
                  ) : (
                    matches.upcoming.map((m, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-855 rounded-xl hover:border-slate-300 dark:hover:border-slate-800 transition-colors">
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-slate-850 dark:text-slate-200">{m.teams}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-500 font-semibold">{m.date} at {m.time} • {m.tournamentName}</div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-xs text-slate-550 dark:text-slate-400 font-semibold">{m.venue}</div>
                          <span className="text-[9px] px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-bold border border-yellow-500/20">Upcoming</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Statistics Leaders leaderboard */}
            <div className="glass-card rounded-2xl p-6 border border-slate-250 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-850 pb-3 mb-4">
                  <Star className="w-4.5 h-4.5 text-accent dark:text-highlight shrink-0" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">Tournament Overview & Standouts</h3>
                </div>

                <div className="divide-y divide-slate-200/50 dark:divide-slate-850">
                  {loading ? (
                    Array(6).fill(0).map((_, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between">
                        <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-1/3 animate-pulse" />
                        <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-1/4 animate-pulse" />
                      </div>
                    ))
                  ) : (
                    <>
                      {/* Top Scorer */}
                      <div className="py-2.5 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold block uppercase">Top Runs Scorer</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{leaders.topScorer?.name || "N/A"}</span>
                          <span className="text-[9px] text-slate-500 ml-1.5 font-semibold">({leaders.topScorer?.teamName || "N/A"})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-accent">{leaders.topScorer?.runs || 0} Runs</span>
                          <span className="text-[9px] text-slate-400 block font-mono">SR: {leaders.topScorer?.strikeRate || 0.00}</span>
                        </div>
                      </div>

                      {/* Top Wickets */}
                      <div className="py-2.5 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold block uppercase">Top Wickets Taker</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{leaders.topWicketTaker?.name || "N/A"}</span>
                          <span className="text-[9px] text-slate-500 ml-1.5 font-semibold">({leaders.topWicketTaker?.teamName || "N/A"})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-highlight">{leaders.topWicketTaker?.wickets || 0} Wkts</span>
                          <span className="text-[9px] text-slate-400 block font-mono">Econ: {leaders.topWicketTaker?.economy || 0.00}</span>
                        </div>
                      </div>

                      {/* Most Sixes */}
                      <div className="py-2.5 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold block uppercase">Most Sixes</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{leaders.mostSixes?.name || "N/A"}</span>
                          <span className="text-[9px] text-slate-500 ml-1.5 font-semibold">({leaders.mostSixes?.teamName || "N/A"})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-orange-500">{leaders.mostSixes?.sixes || 0} Sixes</span>
                        </div>
                      </div>

                      {/* Most Fours */}
                      <div className="py-2.5 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold block uppercase">Most Fours</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{leaders.mostFours?.name || "N/A"}</span>
                          <span className="text-[9px] text-slate-500 ml-1.5 font-semibold">({leaders.mostFours?.teamName || "N/A"})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-blue-500">{leaders.mostFours?.fours || 0} Fours</span>
                        </div>
                      </div>

                      {/* Best Strike Rate */}
                      <div className="py-2.5 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold block uppercase">Best Strike Rate</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{leaders.bestStrikeRate?.name || "N/A"}</span>
                          <span className="text-[9px] text-slate-500 ml-1.5 font-semibold">({leaders.bestStrikeRate?.teamName || "N/A"})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-purple-500">{leaders.bestStrikeRate?.strikeRate || 0.00}</span>
                          <span className="text-[9px] text-slate-400 block font-mono">({leaders.bestStrikeRate?.runs || 0} runs min)</span>
                        </div>
                      </div>

                      {/* Best Economy */}
                      <div className="py-2.5 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold block uppercase">Best Economy</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{leaders.bestEconomy?.name || "N/A"}</span>
                          <span className="text-[9px] text-slate-500 ml-1.5 font-semibold">({leaders.bestEconomy?.teamName || "N/A"})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-green-500">{leaders.bestEconomy?.economy || 0.00}</span>
                          <span className="text-[9px] text-slate-400 block font-mono">({leaders.bestEconomy?.wickets || 0} wickets)</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {!error && !loading && (
                <div className="p-3.5 bg-slate-100/60 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl mt-6 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
                  <p className="text-[10px] text-slate-500 dark:text-slate-450 leading-normal font-semibold">
                    MySQL Connection is active. Dashboard is rendering live statistics.
                  </p>
                </div>
              )}
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;