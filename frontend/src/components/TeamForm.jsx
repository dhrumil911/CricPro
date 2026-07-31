import { useState, useEffect } from "react";
import { X, Shield, Save, User, MapPin, Calendar, FileText, Award } from "lucide-react";
import { createTeam, updateTeam } from "../services/api.js";

function TeamForm({ closeForm, editingTeam, onSuccess }) {
  const [teamName, setTeamName] = useState(editingTeam?.team_name || "");
  const [shortName, setShortName] = useState(editingTeam?.short_name || "");
  const [logo, setLogo] = useState(editingTeam?.logo || "");
  const [captain, setCaptain] = useState(editingTeam?.captain || "");
  const [coach, setCoach] = useState(editingTeam?.coach || "");
  const [homeGround, setHomeGround] = useState(editingTeam?.home_ground || "");
  const [foundedYear, setFoundedYear] = useState(editingTeam?.founded_year || "");
  const [description, setDescription] = useState(editingTeam?.description || "");
  const [status, setStatus] = useState(editingTeam?.status || "Active");
  
  // Stats
  const [wins, setWins] = useState(editingTeam?.wins !== undefined ? editingTeam.wins : 0);
  const [losses, setLosses] = useState(editingTeam?.losses !== undefined ? editingTeam.losses : 0);
  const [points, setPoints] = useState(editingTeam?.points !== undefined ? editingTeam.points : 0);
  const [nrr, setNrr] = useState(editingTeam?.nrr !== undefined ? editingTeam.nrr : 0.000);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teamName.trim() || !shortName.trim()) {
      setError("Please fill all required fields: Team Name and Short Name.");
      return;
    }

    const currentYear = new Date().getFullYear();
    if (foundedYear) {
      const yearVal = parseInt(foundedYear);
      if (isNaN(yearVal) || yearVal < 1800 || yearVal > currentYear) {
        setError(`Please enter a valid founded year between 1800 and ${currentYear}`);
        return;
      }
    }

    try {
      setError("");
      setSubmitting(true);

      const payload = {
        team_name: teamName.trim(),
        short_name: shortName.trim().toUpperCase(),
        logo: logo.trim() || null,
        captain: captain.trim() || null,
        coach: coach.trim() || null,
        home_ground: homeGround.trim() || null,
        founded_year: foundedYear ? parseInt(foundedYear) : null,
        description: description.trim() || null,
        status,
        wins: parseInt(wins) || 0,
        losses: parseInt(losses) || 0,
        points: parseInt(points) || 0,
        nrr: parseFloat(nrr) || 0.000
      };

      let result;
      if (editingTeam) {
        result = await updateTeam(editingTeam.id, payload);
      } else {
        result = await createTeam(payload);
      }

      if (result.success) {
        onSuccess(editingTeam ? "Franchise updated successfully!" : "Franchise created successfully!");
        closeForm();
      } else {
        setError(result.message || "Failed to save team details.");
      }
    } catch (err) {
      console.error("TeamForm save error:", err);
      setError(
        err.response?.data?.message || "Failed to communicate with API server. Please check your connection."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeForm} />

      <div className="relative w-full max-w-lg glass-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden z-10">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-accent to-highlight" />

        <button
          onClick={closeForm}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-accent dark:text-highlight" />
          <h2 className="font-display font-bold text-base text-slate-850 dark:text-slate-150 text-left">
            {editingTeam ? "Edit Franchise" : "Register New Franchise"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left overflow-y-auto max-h-[75vh] pr-1">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-danger text-xs font-bold rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Team Name *</label>
              <input
                type="text"
                placeholder="e.g. Mumbai Indians"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Short Name *</label>
              <input
                type="text"
                placeholder="e.g. MI"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                maxLength={10}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors uppercase"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Team Logo URL</label>
            <input
              type="text"
              placeholder="e.g. https://example.com/logo.png"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
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
                placeholder="Brief franchise background, major history, and championships..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Captain</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="text"
                  placeholder="Captain Name"
                  value={captain}
                  onChange={(e) => setCaptain(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Coach</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="text"
                  placeholder="Coach Name"
                  value={coach}
                  onChange={(e) => setCoach(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Home Ground</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="text"
                  placeholder="Home Stadium Name"
                  value={homeGround}
                  onChange={(e) => setHomeGround(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Founded Year</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="number"
                  placeholder="e.g. 2008"
                  value={foundedYear}
                  onChange={(e) => setFoundedYear(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Franchise Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-205 text-xs transition-colors"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Net Run Rate (NRR)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Award className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="number"
                  step="0.001"
                  placeholder="e.g. 0.852"
                  value={nrr}
                  onChange={(e) => setNrr(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Wins</label>
              <input
                type="number"
                value={wins}
                onChange={(e) => setWins(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Losses</label>
              <input
                type="number"
                value={losses}
                onChange={(e) => setLosses(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Points</label>
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 dark:border-slate-850">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 rounded-xl bg-accent text-slate-100 font-bold hover:bg-blue-600 hover:shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {submitting ? "Saving..." : editingTeam ? "Update" : "Save"}
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

export default TeamForm;