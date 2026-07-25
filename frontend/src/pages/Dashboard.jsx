import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardCard from "../components/DashboardCard";
import QuickAction from "../components/QuickAction";
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
import { Calendar, History, Trophy, TrendingUp, ShieldAlert, Award } from "lucide-react";

function Dashboard() {
  const growthData = [
    { name: "Jan", Tournaments: 2 },
    { name: "Feb", Tournaments: 4 },
    { name: "Mar", Tournaments: 7 },
    { name: "Apr", Tournaments: 9 },
    { name: "May", Tournaments: 12 },
  ];

  const matchStatusData = [
    { name: "Upcoming", value: 104, color: "#facc15" },
    { name: "Live", value: 8, color: "#ef4444" },
    { name: "Completed", value: 56, color: "#22c55e" },
  ];

  const teamPerformanceData = [
    { name: "MI", Wins: 10, color: "#2563eb" },
    { name: "CSK", Wins: 8, color: "#eab308" },
    { name: "RCB", Wins: 7, color: "#ef4444" },
    { name: "GT", Wins: 7, color: "#6366f1" },
    { name: "KKR", Wins: 6, color: "#a855f7" },
  ];

  const recentMatches = [
    { teams: "MI vs CSK", result: "MI won by 8 wickets", date: "2026-08-12", status: "Completed" },
    { teams: "RCB vs GT", result: "RCB won by 5 runs", date: "2026-07-30", status: "Completed" },
  ];

  const upcomingMatches = [
    { teams: "DC vs MI", time: "19:30", date: "2026-08-16", venue: "Wankhede Stadium" },
    { teams: "CSK vs GT", time: "20:00", date: "2026-08-18", venue: "M. Chinnaswamy Stadium" },
  ];

  const recentActivities = [
    { action: "Tournament Created", detail: "IPL 2026 was initialized", time: "10m ago" },
    { action: "Match Scheduled", detail: "RCB vs GT was confirmed", time: "1h ago" },
    { action: "Team Registered", detail: "Gujarat Titans squad uploaded", time: "3h ago" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Repeating Pitch pattern for background */}
        <div className="absolute inset-0 pitch-texture opacity-30 pointer-events-none" />
        
        <Topbar />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 relative z-10">
          
          {/* Welcome Banner */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-left">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-display">
                CricPro Dashboard
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                Welcome back, Admin. Here's a brief snapshot of your tournaments today.
              </p>
            </div>
            <div className="text-xs text-accent dark:text-highlight font-bold px-3.5 py-1.5 bg-accent/10 dark:bg-highlight/10 border border-accent/20 dark:border-highlight/20 rounded-full flex items-center gap-1.5 animate-pulse uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-accent dark:bg-highlight rounded-full" />
              Live Server Online
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard number="12" title="Tournaments" icon="🏆" />
            <DashboardCard number="48" title="Teams" icon="👥" />
            <DashboardCard number="720" title="Players" icon="🏏" />
            <DashboardCard number="168" title="Matches" icon="📅" />
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

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Tournament Growth */}
            <div className="glass-card rounded-2xl p-5 border border-slate-250 dark:border-slate-800 flex flex-col h-[280px] text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-xs text-slate-700 dark:text-slate-350 uppercase tracking-wider">Tournament Growth</h3>
                <TrendingUp className="w-4 h-4 text-accent dark:text-highlight" />
              </div>
              <div className="flex-1 w-full text-[9px] font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTourn" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                    <Area type="monotone" dataKey="Tournaments" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorTourn)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Match Status Breakdown */}
            <div className="glass-card rounded-2xl p-5 border border-slate-250 dark:border-slate-800 flex flex-col h-[280px] text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-xs text-slate-700 dark:text-slate-350 uppercase tracking-wider">Match Status</h3>
                <Calendar className="w-4 h-4 text-accent dark:text-highlight" />
              </div>
              <div className="flex-1 w-full text-[9px] font-semibold flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={matchStatusData}
                      cx="50%"
                      cy="48%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {matchStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Team Performance */}
            <div className="glass-card rounded-2xl p-5 border border-slate-250 dark:border-slate-800 flex flex-col h-[280px] text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-xs text-slate-700 dark:text-slate-350 uppercase tracking-wider">Team Performance (Wins)</h3>
                <Trophy className="w-4 h-4 text-accent dark:text-highlight" />
              </div>
              <div className="flex-1 w-full text-[9px] font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamPerformanceData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                    <Bar dataKey="Wins" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Lower Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            
            {/* Recent & Upcoming Matches */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-250 dark:border-slate-800 space-y-6">
              
              {/* Recent */}
              <div>
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-850 pb-3 mb-4">
                  <History className="w-4.5 h-4.5 text-accent dark:text-highlight shrink-0" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">Recent Completed Matches</h3>
                </div>
                <div className="space-y-3">
                  {recentMatches.map((m, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-855 rounded-xl hover:border-slate-300 dark:hover:border-slate-800 transition-colors">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-850 dark:text-slate-200">{m.teams}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-500 font-semibold">{m.date}</div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-xs text-accent dark:text-accent font-bold">{m.result}</div>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-green-500/10 text-green-500 dark:text-green-400 font-bold border border-green-500/20">Completed</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming */}
              <div>
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-850 pb-3 mb-4">
                  <Calendar className="w-4.5 h-4.5 text-accent dark:text-highlight shrink-0" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">Upcoming Fixtures</h3>
                </div>
                <div className="space-y-3">
                  {upcomingMatches.map((m, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-855 rounded-xl hover:border-slate-300 dark:hover:border-slate-800 transition-colors">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-850 dark:text-slate-200">{m.teams}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-500 font-semibold">{m.date} at {m.time}</div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-xs text-slate-550 dark:text-slate-400 font-semibold">{m.venue}</div>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-bold border border-yellow-500/20">Upcoming</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Activities & Alerts */}
            <div className="glass-card rounded-2xl p-6 border border-slate-250 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-850 pb-3 mb-4">
                  <Award className="w-4.5 h-4.5 text-accent dark:text-highlight shrink-0" />
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">Recent CricPro Events</h3>
                </div>
                
                <div className="space-y-4">
                  {recentActivities.map((act, i) => (
                    <div key={i} className="flex items-start gap-3 relative pb-4 last:pb-0">
                      <span className="w-2 h-2 rounded-full bg-accent dark:bg-highlight mt-1.5 shrink-0" />
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{act.action}</div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-450">{act.detail}</p>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-slate-100/60 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl mt-6 flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-highlight shrink-0 animate-pulse" />
                <p className="text-[10px] text-slate-500 dark:text-slate-450 leading-normal font-semibold">
                  MySQL connection is offline. Running fully local mock dataset.
                </p>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;