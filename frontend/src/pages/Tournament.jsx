import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TournamentForm from "../components/TournamentForm";
import TournamentCard from "../components/TournamentCard";
import { 
  getTournaments, 
  deleteTournamentApi, 
  getTournamentStats 
} from "../services/api.js";
import { 
  Plus, 
  Search, 
  Trash, 
  Edit, 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  ArrowUpDown, 
  Filter, 
  CheckCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

function Tournament() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [editingTournament, setEditingTournament] = useState(null);

  // Pagination states
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const limit = 6; // items per page

  // Summary counts
  const [stats, setStats] = useState({
    Upcoming: 0,
    Ongoing: 0,
    Completed: 0
  });

  // Dialog & Toast states
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const triggerToast = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  // Fetch stats summaries
  const fetchStats = async () => {
    try {
      const res = await getTournamentStats();
      if (res.success) {
        setStats(res.stats);
      }
    } catch (err) {
      console.error("Error loading tournament stats:", err);
    }
  };

  // Fetch paginated tournaments
  const fetchTournaments = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit,
        search,
        status: statusFilter,
        sortBy
      };

      const res = await getTournaments(params);
      if (res.success) {
        setTournaments(res.tournaments);
        setTotalPages(res.pagination.pages);
        setTotalRecords(res.pagination.total);
      }
    } catch (err) {
      console.error("Error fetching tournaments list:", err);
      triggerToast("Failed to fetch tournaments from database", "error");
    } finally {
      setLoading(false);
    }
  };

  // Run searches with debounce or instant input checks
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1);
      fetchTournaments();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // Handle filters & sorting changes
  useEffect(() => {
    setCurrentPage(1);
    fetchTournaments();
  }, [statusFilter, sortBy]);

  // Load pages
  useEffect(() => {
    fetchTournaments();
    fetchStats();
  }, [currentPage]);

  // Form actions success handler
  const handleFormSuccess = (msg) => {
    triggerToast(msg, "success");
    fetchTournaments();
    fetchStats();
  };

  // Edit action
  const editTournament = (tournament) => {
    setEditingTournament(tournament);
    setShowForm(true);
  };

  // Trigger delete confirmation dialog
  const handleDeleteTrigger = (id) => {
    setConfirmDeleteId(id);
  };

  // Confirm delete action
  const confirmDelete = async () => {
    if (!confirmDeleteId) return;

    try {
      const res = await deleteTournamentApi(confirmDeleteId);
      if (res.success) {
        triggerToast("Tournament deleted successfully", "success");
        setConfirmDeleteId(null);
        // Reset page if needed
        if (tournaments.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        } else {
          fetchTournaments();
        }
        fetchStats();
      } else {
        triggerToast(res.message || "Failed to delete tournament", "error");
      }
    } catch (err) {
      console.error("Error deleting tournament:", err);
      triggerToast(err.response?.data?.message || "Failed to delete tournament", "error");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-green-500/10 text-accent border-green-500/20";
      case "Upcoming":
        return "bg-yellow-500/10 text-highlight border-yellow-500/20";
      case "Completed":
        return "bg-slate-550/10 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700/30";
      default:
        return "bg-slate-550/10 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700/30";
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
            <div className="relative w-full max-w-sm glass-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center z-10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-danger text-lg animate-bounce">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-slate-850 dark:text-slate-100">Confirm Deletion</h3>
                <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-semibold">
                  Are you sure you want to permanently delete this tournament? This action cannot be undone.
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
                  className="flex-1 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all text-xs uppercase tracking-wider cursor-pointer font-sans"
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
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2 font-display">
                🏆 Tournament Management
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                Configure formats, set default venues, manage timelines and verify completed tournament champions.
              </p>
            </div>

            <button
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-accent text-slate-100 font-bold hover:bg-blue-600 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer font-display"
              onClick={() => {
                setEditingTournament(null);
                setShowForm(true);
              }}
            >
              <Plus className="w-4 h-4" />
              Add Tournament
            </button>
          </div>

          {/* Quick status summary metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="glass-card p-4 rounded-xl border border-slate-250 dark:border-slate-800 flex items-center gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 dark:bg-highlight animate-pulse" />
              <div>
                <div className="text-lg font-extrabold leading-none text-slate-850 dark:text-slate-100">{stats.Upcoming}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-450 uppercase font-bold tracking-wider mt-0.5">Upcoming Leagues</div>
              </div>
            </div>
            <div className="glass-card p-4 rounded-xl border border-slate-250 dark:border-slate-800 flex items-center gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 dark:bg-accent animate-pulse" />
              <div>
                <div className="text-lg font-extrabold leading-none text-slate-850 dark:text-slate-100">{stats.Ongoing}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-450 uppercase font-bold tracking-wider mt-0.5">Active / Ongoing</div>
              </div>
            </div>
            <div className="glass-card p-4 rounded-xl border border-slate-250 dark:border-slate-800 flex items-center gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500 dark:bg-slate-400" />
              <div>
                <div className="text-lg font-extrabold leading-none text-slate-850 dark:text-slate-100">{stats.Completed}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-450 uppercase font-bold tracking-wider mt-0.5">Completed Series</div>
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
                placeholder="Search tournaments by name, venue or format..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-850 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Status Filter */}
              <div className="flex items-center gap-1.5 flex-1 sm:flex-none">
                <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-550 shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-auto px-3.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-205 text-xs transition-colors"
                >
                  <option value="">All Statuses</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Sorting Filter */}
              <div className="flex items-center gap-1.5 flex-1 sm:flex-none">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-555 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-3.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-205 text-xs transition-colors"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Sort by Name</option>
                  <option value="start_date">Sort by Start Date</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tournament Grid List & Table Views */}
          {loading ? (
            /* Loading Skeleton Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array(limit).fill(0).map((_, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-250 dark:border-slate-800/85 h-64 animate-pulse flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-4.5 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                    <div className="border-t border-slate-200 dark:border-slate-850 pt-3 space-y-2">
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-850">
                    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded flex-1" />
                    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded flex-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : tournaments.length > 0 ? (
            <div className="space-y-6">
              
              {/* Desktop Table View */}
              <div className="hidden lg:block glass-card rounded-2xl border border-slate-250 dark:border-slate-800 overflow-hidden">
                <table className="w-full text-left border-collapse text-xs text-slate-700 dark:text-slate-300">
                  <thead>
                    <tr className="bg-slate-100/50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-850 uppercase text-[9px] font-bold tracking-wider text-slate-500 dark:text-slate-450 select-none">
                      <th className="px-6 py-4">Tournament</th>
                      <th className="px-6 py-4">Format</th>
                      <th className="px-6 py-4">Venue</th>
                      <th className="px-6 py-4">Teams</th>
                      <th className="px-6 py-4">Overs</th>
                      <th className="px-6 py-4">Dates</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 dark:divide-slate-850/60">
                    {tournaments.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-100/30 dark:hover:bg-slate-900/20 transition-colors">
                        <td className="px-6 py-4.5">
                          <div className="font-bold text-slate-850 dark:text-slate-200">{t.name}</div>
                          {t.description && <div className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5 max-w-[200px] truncate">{t.description}</div>}
                        </td>
                        <td className="px-6 py-4.5 font-medium">{t.format}</td>
                        <td className="px-6 py-4.5">{t.venue}</td>
                        <td className="px-6 py-4.5 font-semibold font-mono">{t.total_teams}</td>
                        <td className="px-6 py-4.5 font-semibold font-mono">{t.overs}</td>
                        <td className="px-6 py-4.5 font-medium">{t.start_date} to {t.end_date}</td>
                        <td className="px-6 py-4.5">
                          <span className={`text-[9px] font-semibold px-2 py-0.5 border rounded-full ${getStatusBadge(t.status)}`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-center">
                          <div className="flex items-center justify-center gap-2.5">
                            <button
                              onClick={() => editTournament(t)}
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-550 dark:text-slate-400 hover:text-accent dark:hover:text-highlight hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                              title="Edit Tournament"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTrigger(t.id)}
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-danger hover:bg-red-500/5 transition-colors cursor-pointer"
                              title="Delete Tournament"
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
                {tournaments.map((tournament) => (
                  <TournamentCard
                    key={tournament.id}
                    tournament={tournament}
                    deleteTournament={handleDeleteTrigger}
                    editTournament={editTournament}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center bg-white/40 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-4.5 rounded-2xl text-xs font-semibold select-none">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 disabled:opacity-40 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  <span className="text-slate-500 dark:text-slate-400">
                    Page <strong className="text-slate-800 dark:text-slate-200 font-mono">{currentPage}</strong> of <strong className="text-slate-800 dark:text-slate-200 font-mono">{totalPages}</strong>
                    <span className="hidden sm:inline"> ({totalRecords} total tournaments)</span>
                  </span>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 disabled:opacity-40 transition-all cursor-pointer"
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
                <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200">No tournaments found</h3>
                <p className="text-xs text-slate-500 dark:text-slate-450 font-semibold">Try another status filter, check spelling, or register a new one above.</p>
              </div>
            </div>
          )}

          {/* Form Modal overlay */}
          {showForm && (
            <TournamentForm
              closeForm={() => {
                setShowForm(false);
                setEditingTournament(null);
              }}
              editingTournament={editingTournament}
              onSuccess={handleFormSuccess}
            />
          )}

        </main>
      </div>
    </div>
  );
}

export default Tournament;