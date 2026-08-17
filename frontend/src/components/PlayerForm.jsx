import { useState, useEffect } from "react";
import { X, User, Shield, Save, Calendar, Award, Globe, FileText } from "lucide-react";
import { createPlayer, updatePlayer, getTeamDropdown } from "../services/api.js";

function PlayerForm({ closeForm, editingPlayer, onSuccess }) {
  const [playerName, setPlayerName] = useState(editingPlayer?.player_name || "");
  const [teamId, setTeamId] = useState(editingPlayer?.team_id || "");
  const [profileImage, setProfileImage] = useState(editingPlayer?.profile_image || "");
  const [jerseyNumber, setJerseyNumber] = useState(editingPlayer?.jersey_number || "");
  const [role, setRole] = useState(editingPlayer?.role || "Batsman");
  const [battingStyle, setBattingStyle] = useState(editingPlayer?.batting_style || "Right-hand bat");
  const [bowlingStyle, setBowlingStyle] = useState(editingPlayer?.bowling_style || "None");
  const [dateOfBirth, setDateOfBirth] = useState(
    editingPlayer?.date_of_birth ? editingPlayer.date_of_birth.substring(0, 10) : ""
  );
  const [nationality, setNationality] = useState(editingPlayer?.nationality || "Indian");
  const [status, setStatus] = useState(editingPlayer?.status || "Active");

  // Stats
  const [matchesPlayed, setMatchesPlayed] = useState(editingPlayer?.matches_played !== undefined ? editingPlayer.matches_played : 0);
  const [runs, setRuns] = useState(editingPlayer?.runs !== undefined ? editingPlayer.runs : 0);
  const [wickets, setWickets] = useState(editingPlayer?.wickets !== undefined ? editingPlayer.wickets : 0);
  const [sixes, setSixes] = useState(editingPlayer?.sixes !== undefined ? editingPlayer.sixes : 0);
  const [fours, setFours] = useState(editingPlayer?.fours !== undefined ? editingPlayer.fours : 0);
  const [strikeRate, setStrikeRate] = useState(editingPlayer?.strike_rate !== undefined ? editingPlayer.strike_rate : 0.00);
  const [economy, setEconomy] = useState(editingPlayer?.economy !== undefined ? editingPlayer.economy : 0.00);

  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Load team dropdown selections
  useEffect(() => {
    const loadTeams = async () => {
      try {
        const res = await getTeamDropdown();
        if (res.success) {
          setTeams(res.teams);
        }
      } catch (err) {
        console.error("Error loading team dropdown in PlayerForm:", err);
      }
    };
    loadTeams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields check
    if (!playerName.trim() || !role) {
      setError("Please fill all required fields: Player Name and Role.");
      return;
    }

    if (!teamId) {
      setError("Team selection is required. Please assign the player to a franchise.");
      return;
    }

    // Positive numeric validations
    if (parseInt(matchesPlayed) < 0 || parseInt(runs) < 0 || parseInt(wickets) < 0 || parseInt(sixes) < 0 || parseInt(fours) < 0 || parseFloat(strikeRate) < 0 || parseFloat(economy) < 0) {
      setError("All statistics and performance figures must be positive numbers.");
      return;
    }

    try {
      setError("");
      setSubmitting(true);

      const payload = {
        team_id: parseInt(teamId),
        player_name: playerName.trim(),
        profile_image: profileImage.trim() || null,
        jersey_number: jerseyNumber ? parseInt(jerseyNumber) : null,
        role,
        batting_style: battingStyle.trim() || null,
        bowling_style: bowlingStyle.trim() || null,
        date_of_birth: dateOfBirth || null,
        nationality: nationality.trim() || null,
        matches_played: parseInt(matchesPlayed) || 0,
        runs: parseInt(runs) || 0,
        wickets: parseInt(wickets) || 0,
        sixes: parseInt(sixes) || 0,
        fours: parseInt(fours) || 0,
        strike_rate: parseFloat(strikeRate) || 0.00,
        economy: parseFloat(economy) || 0.00,
        status
      };

      let result;
      if (editingPlayer) {
        result = await updatePlayer(editingPlayer.id, payload);
      } else {
        result = await createPlayer(payload);
      }

      if (result.success) {
        onSuccess(editingPlayer ? "Player updated successfully!" : "Player registered successfully!");
        closeForm();
      } else {
        setError(result.message || "Failed to save player details.");
      }
    } catch (err) {
      console.error("PlayerForm save error:", err);
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

      <div className="relative w-full max-w-lg glass-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden z-10 animate-fade-in">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-accent to-highlight" />

        <button
          onClick={closeForm}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-accent dark:text-highlight" />
          <h2 className="font-display font-bold text-base text-slate-850 dark:text-slate-150 text-left">
            {editingPlayer ? "Edit Player Details" : "Register New Player"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left overflow-y-auto max-h-[72vh] pr-1">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-danger text-xs font-bold rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Player Name *</label>
              <input
                type="text"
                placeholder="e.g. Virat Kohli"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-455 dark:placeholder-slate-600 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Jersey Number</label>
              <input
                type="number"
                placeholder="e.g. 18"
                value={jerseyNumber}
                onChange={(e) => setJerseyNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-455 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Franchise Team *</label>
              <select
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-205 text-xs transition-colors"
              >
                <option value="">Select Team</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.team_name} ({t.short_name})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-205 text-xs transition-colors"
              >
                <option value="Active">Active</option>
                <option value="Injured">Injured</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Role *</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-205 text-xs transition-colors"
              >
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-rounder">All-rounder</option>
                <option value="Wicket-keeper">Wicket-keeper</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Batting Style</label>
              <select
                value={battingStyle}
                onChange={(e) => setBattingStyle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-205 text-xs transition-colors"
              >
                <option value="Right-hand bat">Right-hand bat</option>
                <option value="Left-hand bat">Left-hand bat</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Bowling Style</label>
              <select
                value={bowlingStyle}
                onChange={(e) => setBowlingStyle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-205 text-xs transition-colors"
              >
                <option value="None">None</option>
                <option value="Right-arm fast">Right-arm fast</option>
                <option value="Right-arm fast-medium">Right-arm fast-medium</option>
                <option value="Right-arm offbreak">Right-arm offbreak</option>
                <option value="Right-arm legbreak">Right-arm legbreak</option>
                <option value="Left-arm fast">Left-arm fast</option>
                <option value="Left-arm orthodox">Left-arm orthodox</option>
                <option value="Left-arm chinaman">Left-arm chinaman</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Date of Birth</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Nationality</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="text"
                  placeholder="e.g. Indian, Australian"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-455 dark:placeholder-slate-600 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Profile Image URL</label>
            <input
              type="text"
              placeholder="e.g. https://example.com/avatar.png"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-455 dark:placeholder-slate-600 transition-colors"
            />
          </div>

          <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-855 dark:text-slate-200 border-b border-slate-200 dark:border-slate-850 pb-2 mt-6 pt-4 text-left">
            Performance Statistics
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Matches</label>
              <input
                type="number"
                value={matchesPlayed}
                onChange={(e) => setMatchesPlayed(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Runs</label>
              <input
                type="number"
                value={runs}
                onChange={(e) => setRuns(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Wickets</label>
              <input
                type="number"
                value={wickets}
                onChange={(e) => setWickets(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Strike Rate</label>
              <input
                type="number"
                step="0.01"
                value={strikeRate}
                onChange={(e) => setStrikeRate(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Economy</label>
              <input
                type="number"
                step="0.01"
                value={economy}
                onChange={(e) => setEconomy(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Sixes</label>
              <input
                type="number"
                value={sixes}
                onChange={(e) => setSixes(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Fours</label>
              <input
                type="number"
                value={fours}
                onChange={(e) => setFours(e.target.value)}
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
              {submitting ? "Registering..." : editingPlayer ? "Update" : "Register"}
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

export default PlayerForm;
