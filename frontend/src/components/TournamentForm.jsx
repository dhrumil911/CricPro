import { useState, useEffect } from "react";
import { X, Award, Save, Calendar, MapPin, Users, Hash, FileText } from "lucide-react";
import { createTournament, updateTournament } from "../services/api.js";

function TournamentForm({
  closeForm,
  editingTournament,
  onSuccess
}) {
  const [name, setName] = useState(editingTournament?.name || "");
  const [description, setDescription] = useState(editingTournament?.description || "");
  const [format, setFormat] = useState(editingTournament?.format || "League");
  const [startDate, setStartDate] = useState(editingTournament?.start_date || "");
  const [endDate, setEndDate] = useState(editingTournament?.end_date || "");
  const [venue, setVenue] = useState(editingTournament?.venue || "");
  const [totalTeams, setTotalTeams] = useState(editingTournament?.total_teams || "");
  const [overs, setOvers] = useState(editingTournament?.overs || "20");
  const [status, setStatus] = useState(editingTournament?.status || "Upcoming");
  const [winnerTeam, setWinnerTeam] = useState(editingTournament?.winner_team || "");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation
    if (!name.trim() || !format || !startDate || !endDate || !venue.trim() || !totalTeams || !overs) {
      setError("Please fill all required fields.");
      return;
    }

    const teamsNum = Number(totalTeams);
    const oversNum = Number(overs);

    if (isNaN(teamsNum) || teamsNum <= 0) {
      setError("Total teams must be a positive integer.");
      return;
    }

    if (isNaN(oversNum) || oversNum <= 0) {
      setError("Overs must be a positive integer.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      setError("End date must be greater than or equal to start date.");
      return;
    }

    try {
      setError("");
      setSubmitting(true);

      const payload = {
        name: name.trim(),
        description: description.trim() || null,
        format,
        venue: venue.trim(),
        start_date: startDate,
        end_date: endDate,
        total_teams: teamsNum,
        overs: oversNum,
        status,
        winner_team: status === "Completed" ? (winnerTeam.trim() || null) : null
      };

      let result;
      if (editingTournament) {
        result = await updateTournament(editingTournament.id, payload);
      } else {
        result = await createTournament(payload);
      }

      if (result.success) {
        onSuccess(editingTournament ? "Tournament updated successfully!" : "Tournament created successfully!");
        closeForm();
      } else {
        setError(result.message || "Failed to save tournament.");
      }
    } catch (err) {
      console.error("TournamentForm action error:", err);
      setError(
        err.response?.data?.message || "Failed to communicate with API server. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeForm} />

      <div className="relative w-full max-w-lg glass-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-y-auto max-h-[90vh] z-10">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-accent to-highlight" />
        
        <button
          onClick={closeForm}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-accent dark:text-highlight" />
          <h2 className="font-display font-bold text-base text-slate-850 dark:text-slate-150">
            {editingTournament ? "Edit Tournament" : "Create New Tournament"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-danger text-xs font-bold rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Tournament Name *</label>
            <input
              type="text"
              placeholder="e.g. Champions Cup T20"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Description</label>
            <div className="relative">
              <span className="absolute top-3 left-3 pointer-events-none">
                <FileText className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </span>
              <textarea
                placeholder="Brief summary of the tournament goals, sponsors, and guidelines..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Format *</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-205 text-xs transition-colors"
              >
                <option value="League">League</option>
                <option value="Knockout">Knockout</option>
                <option value="Group Stage">Group Stage</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-205 text-xs transition-colors"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Total Teams *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="number"
                  placeholder="e.g. 12"
                  value={totalTeams}
                  onChange={(e) => setTotalTeams(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Overs per Innings *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Hash className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="number"
                  placeholder="e.g. 20"
                  value={overs}
                  onChange={(e) => setOvers(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Start Date *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">End Date *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Default Venue / Stadium *</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </span>
              <input
                type="text"
                placeholder="e.g. Wankhede Stadium, Mumbai"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          {status === "Completed" && (
            <div className="space-y-1 animate-fadeIn">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Winner Team</label>
              <input
                type="text"
                placeholder="e.g. Mumbai Indians"
                value={winnerTeam}
                onChange={(e) => setWinnerTeam(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 dark:border-slate-850">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 rounded-xl bg-accent text-slate-100 font-bold hover:bg-blue-600 hover:shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {submitting ? "Saving..." : editingTournament ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="flex-1 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-855 transition-all text-xs uppercase tracking-wider cursor-pointer font-sans"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TournamentForm;