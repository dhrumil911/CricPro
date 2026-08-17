import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import PlayerForm from "../components/PlayerForm";
import PlayerCard from "../components/PlayerCard";
import { 
  getPlayers, 
  deletePlayerApi, 
  getPlayerStats, 
  getTeamDropdown 
} from "../services/api.js";
import { 
  Plus, 
  Search, 
  User, 
  Shield, 
  Edit, 
  Trash, 
  Filter, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle,
  Award
} from "lucide-react";

function Player() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [editingPlayer, setEditingPlayer] = useState(null);

  // Pagination states
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const limit = 10; // items per page

  // Dropdown options
  const [teamsDropdown, setTeamsDropdown] = useState([]);

  // Stats summary counts
  const [stats, setStats] = useState({
    totalPlayers: 0,
    activePlayers: 0,
    injuredPlayers: 0,
    teamsRepresented: 0
  });

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Show Toast helper
  const triggerToast = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // Fetch summary stats from Backend
  const fetchStats = async () => {
    try {
      const res = await getPlayerStats();
      if (res.success) {
        setStats(res.stats);
      }
    } catch (err) {
      console.error("Error loading player stats metrics:", err);
    }
  };

  // Fetch team dropdowns list
  const fetchTeamsDropdown = async () => {
    try {
      const res = await getTeamDropdown();
      if (res.success) {
        setTeamsDropdown(res.teams);
      }
    } catch (err) {
      console.error("Error loading team dropdowns:", err);
    }
  };

  // Fetch paginated players list
  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit,
        search: search.trim() || undefined,
        teamId: teamFilter || undefined,
        role: roleFilter || undefined,
        status: statusFilter || undefined,
        sortBy
      };

      const res = await getPlayers(params);
      if (res.success) {
        setPlayers(res.players);
        if (res.pagination) {
          setTotalPages(res.pagination.pages);
          setTotalRecords(res.pagination.total);
        }
      }
    } catch (err) {
      console.error("Error loading players list:", err);
      triggerToast("Failed to retrieve players dataset", "error");
    } finally {
      setLoading(false);
    }
  };

  // Run searches with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1);
      fetchPlayers();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // Handle filters & sorting changes
  useEffect(() => {
    setCurrentPage(1);
    fetchPlayers();
  }, [teamFilter, roleFilter, statusFilter, sortBy]);

  // Load pages
  useEffect(() => {
    fetchPlayers();
    fetchStats();
  }, [currentPage]);

  // Load initial static selections
  useEffect(() => {
    fetchTeamsDropdown();
  }, []);

  // Form actions success handler
  const handleFormSuccess = (msg) => {
    triggerToast(msg, "success");
    fetchPlayers();
    fetchStats();
  };

  // Edit action
  const editPlayer = (player) => {
    setEditingPlayer(player);
    setShowForm(true);
  };

  // Trigger delete confirmation dialog
  const handleDeleteTrigger = (id) => {
    setConfirmDeleteId(id);
  };

  // Execute delete API call
  const confirmDelete = async () => {
    if (!confirmDeleteId) return;

    try {
      const res = await deletePlayerApi(confirmDeleteId);
      if (res.success) {
        triggerToast("Player deleted successfully", "success");
        fetchPlayers();
        fetchStats();
      } else {
        triggerToast(res.message || "Failed to delete player", "error");
      }
    } catch (err) {
      console.error("Error deleting player:", err);
      triggerToast(
        err.response?.data?.message || "Failed to communicate with API server",
        "error"
      );
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const getRoleColor = (roleVal) => {
    switch (roleVal?.toLowerCase()) {
      case "batsman":
        return "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20";
      case "bowler":
        return "bg-red-500/10 text-danger border-red-500/20";
      case "all-rounder":
        return "bg-purple-500/10 text-purple-500 dark:text-purple-455 border-purple-500/20";
      case "wicket-keeper":
      default:
        return "bg-yellow-500/10 text-yellow-600 dark:text-highlight border-yellow-500/20";
    }
  };

  const getStatusBadge = (statusVal) => {
    switch (statusVal) {
      case "Active":
        return "bg-green-500/10 text-accent border-green-500/20";
      case "Injured":
        return "bg-red-500/10 text-danger border-red-500/20";
      case "Retired":
      default:
        return "bg-slate-500/10 text-slate-455 border-slate-550";
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300 relative">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="absolute inset-0 pitch-texture opacity-30 pointer-events-none" />
        
        <Topbar />

        {/* Global Toast Alert */}
        {toastMessage && (
          <div className={`fixed top-4 right-4 z-50 px-4.5 py-3 rounded-xl shadow-lg border text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
            toastType === "success" 
              ? "bg-green-500/10 border-green-500/35 text-green-500"
              : "bg-red-500/10 border-red-500/35 text-danger"
          }`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            {toastMessage}
          </div>
        )}

        {/* Custom Confirmation Dialog */}
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setConfirmDeleteId(null)} />
            <div className="relative w-full max-w-sm glass-card rounded-2xl border border-slate-250 dark:border-slate-800 shadow-2xl p-6 text-center z-10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-danger text-lg animate-bounce">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-slate-855 dark:text-slate-100">Confirm Deletion</h3>
                <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed font-semibold">
                  Are you sure you want to permanently delete this player? This action cannot be undone and will delete stats references.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2.5 rounded-xl bg-danger text-slate-100 font-bold hover:bg-red-655 hover:shadow-lg transition-all text-xs uppercase tracking-wider cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="flex-1 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-855 transition-all text-xs uppercase tracking-wider cursor-pointer font-sans"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 relative z-10">
          
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5 font-display">
                <User className="w-6 h-6 text-accent dark:text-highlight shrink-0" />
                Player Management
              </h1>
              <p className="text-slate-555 dark:text-slate-400 text-xs mt-1">
                Maintain player details, track match milestones, batting/bowling statistics and active statuses.
              </p>
            </div>

            <button
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-accent text-slate-100 font-bold hover:bg-blue-600 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer font-display"
              onClick={() => {
                setEditingPlayer(null);
                setShowForm(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Add Player
            </button>
          </div>

          {/* Quick stats summary metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="glass-card p-4 rounded-xl border border-slate-250 dark:border-slate-800 flex items-center gap-4">
              <div className="p-2 bg-accent/10 dark:bg-accent/20 rounded-xl text-accent dark:text-highlight">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-extrabold leading-none text-slate-850 dark:text-slate-100">{stats.totalPlayers}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-455 uppercase font-bold tracking-wider mt-0.5">Total Players</div>
              </div>
            </div>
            <div className="glass-card p-4 rounded-xl border border-slate-250 dark:border-slate-800 flex items-center gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 dark:bg-accent animate-pulse" />
              <div>
                <div className="text-lg font-extrabold leading-none text-slate-850 dark:text-slate-100">{stats.activePlayers}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-455 uppercase font-bold tracking-wider mt-0.5">Active Players</div>
              </div>
            </div>
            <div className="glass-card p-4 rounded-xl border border-slate-250 dark:border-slate-800 flex items-center gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div>
                <div className="text-lg font-extrabold leading-none text-slate-850 dark:text-slate-100">{stats.injuredPlayers}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-455 uppercase font-bold tracking-wider mt-0.5">Injured Players</div>
              </div>
            </div>
            <div className="glass-card p-4 rounded-xl border border-slate-250 dark:border-slate-800 flex items-center gap-4">
              <div className="p-2 bg-highlight/10 dark:bg-highlight/20 rounded-xl text-highlight">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-extrabold leading-none text-slate-850 dark:text-slate-100">{stats.teamsRepresented}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-455 uppercase font-bold tracking-wider mt-0.5">Teams Represented</div>
              </div>
            </div>
          </div>

          {/* Filters, Search & Sorting Row */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-left bg-white/40 dark:bg-slate-900/10 p-4 border border-slate-200 dark:border-slate-850 rounded-2xl">
            {/* Search Box */}
            <div className="relative w-full lg:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </span>
              <input
                type="text"
                placeholder="Search players by name, style or nationality..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-855 dark:text-slate-200 text-xs placeholder-slate-455 dark:placeholder-slate-600 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Team Filter */}
              <div className="flex items-center gap-1.5 flex-1 sm:flex-none">
                <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-550 shrink-0" />
                <select
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-205 text-xs transition-colors"
                >
                  <option value="">All Teams</option>
                  {teamsDropdown.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.short_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Role Filter */}
              <div className="flex items-center gap-1.5 flex-1 sm:flex-none">
                <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-550 shrink-0" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-205 text-xs transition-colors"
                >
                  <option value="">All Roles</option>
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All-rounder">All-rounder</option>
                  <option value="Wicket-keeper">Wicket-keeper</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 flex-1 sm:flex-none">
                <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-550 shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-auto px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-205 text-xs transition-colors"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Injured">Injured</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>

              {/* Sorting Filter */}
              <div className="flex items-center gap-1.5 flex-1 sm:flex-none">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-555 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-205 text-xs transition-colors"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Sort by Name</option>
                  <option value="runs">Sort by Runs</option>
                  <option value="wickets">Sort by Wickets</option>
                  <option value="strike_rate">Sort by SR</option>
                  <option value="economy">Sort by Economy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Players Table View & Cards Views */}
          {loading ? (
            /* Loading Skeleton Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-250 dark:border-slate-800/85 h-64 animate-pulse flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-4.5 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                    <div className="border-t border-slate-200 dark:border-slate-850 pt-3 space-y-2">
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-850">
                    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded flex-1" />
                    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded flex-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : players.length > 0 ? (
            <div className="space-y-6">
              
              {/* Desktop Table View */}
              <div className="hidden lg:block glass-card rounded-2xl border border-slate-250 dark:border-slate-800 overflow-hidden">
                <table className="w-full text-left border-collapse text-xs text-slate-700 dark:text-slate-300">
                  <thead>
                    <tr className="bg-slate-100/50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-850 uppercase text-[9px] font-bold tracking-wider text-slate-500 dark:text-slate-455 select-none">
                      <th className="px-6 py-4">Photo</th>
                      <th className="px-6 py-4">Player Name</th>
                      <th className="px-6 py-4">Team</th>
                      <th className="px-6 py-4">Jersey No</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Batting Style</th>
                      <th className="px-6 py-4">Bowling Style</th>
                      <th className="px-6 py-4">Nationality</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 dark:divide-slate-850/60">
                    {players.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-100/30 dark:hover:bg-slate-900/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="w-8 h-8 rounded-lg bg-slate-150 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-bold text-accent select-none overflow-hidden">
                            {t.profile_image ? (
                              <img src={t.profile_image} alt={t.player_name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                            ) : (
                              <User className="w-4 h-4" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4.5">
                          <div className="font-bold text-slate-855 dark:text-slate-200">{t.player_name}</div>
                          {t.matches_played > 0 && (
                            <div className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5">
                              {t.matches_played} Matches | {t.runs} Runs | {t.wickets} Wkts
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4.5 font-bold uppercase text-slate-700 dark:text-slate-300">
                          {t.team_short_name || t.team_name || "Free Agent"}
                        </td>
                        <td className="px-6 py-4.5 font-mono font-semibold text-accent dark:text-highlight">
                          #{t.jersey_number || "—"}
                        </td>
                        <td className="px-6 py-4.5">
                          <span className={`text-[9px] font-semibold px-2 py-0.5 border rounded-full ${getRoleColor(t.role)}`}>
                            {t.role}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 font-medium">{t.batting_style || "—"}</td>
                        <td className="px-6 py-4.5 font-medium">{t.bowling_style || "—"}</td>
                        <td className="px-6 py-4.5">{t.nationality || "—"}</td>
                        <td className="px-6 py-4.5">
                          <span className={`text-[9px] font-semibold px-2 py-0.5 border rounded-full ${getStatusBadge(t.status)}`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-center">
                          <div className="flex items-center justify-center gap-2.5">
                            <button
                              onClick={() => editPlayer(t)}
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-550 dark:text-slate-400 hover:text-accent dark:hover:text-highlight hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                              title="Edit Player Details"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTrigger(t.id)}
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-danger hover:bg-red-500/5 transition-colors cursor-pointer"
                              title="Delete Player"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View (hidden on lg+) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
                {players.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    deletePlayer={handleDeleteTrigger}
                    editPlayer={editPlayer}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalRecords > 10 && (
                <div className="flex justify-between items-center bg-white/40 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-4.5 rounded-2xl text-xs font-semibold select-none">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-550/10 disabled:opacity-40 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  <span className="text-slate-500 dark:text-slate-400">
                    Page <strong className="text-slate-800 dark:text-slate-200 font-mono">{currentPage}</strong> of <strong className="text-slate-800 dark:text-slate-200 font-mono">{totalPages}</strong>
                    <span className="hidden sm:inline"> ({totalRecords} total players)</span>
                  </span>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-550/10 disabled:opacity-40 transition-all cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Empty State Layout */
            <div className="glass-card rounded-2xl p-12 border border-slate-250 dark:border-slate-800 text-center max-w-md mx-auto mt-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-855 flex items-center justify-center mx-auto text-lg text-slate-400 dark:text-slate-550">
                🔍
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200">No players found</h3>
                <p className="text-xs text-slate-500 dark:text-slate-450 font-semibold font-sans">Try another team or status filter, check spelling, or register a new player above.</p>
              </div>
            </div>
          )}

          {/* Form Modal overlay */}
          {showForm && (
            <PlayerForm
              closeForm={() => {
                setShowForm(false);
                setEditingPlayer(null);
              }}
              editingPlayer={editingPlayer}
              onSuccess={handleFormSuccess}
            />
          )}

        </main>
      </div>
    </div>
  );
}

export default Player;
