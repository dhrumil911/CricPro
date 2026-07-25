import { useState } from "react";
import { X, User, Save, Shield, Calendar } from "lucide-react";

function PlayerForm({ players, setPlayers, closeForm, editingPlayer }) {
  const [name, setName] = useState(editingPlayer?.name || "");
  const [teamName, setTeamName] = useState(editingPlayer?.teamName || "");
  const [jerseyNumber, setJerseyNumber] = useState(editingPlayer?.jerseyNumber || "");
  const [role, setRole] = useState(editingPlayer?.role || "");
  const [battingStyle, setBattingStyle] = useState(editingPlayer?.battingStyle || "");
  const [bowlingStyle, setBowlingStyle] = useState(editingPlayer?.bowlingStyle || "");
  const [age, setAge] = useState(editingPlayer?.age || "");
  const [matches, setMatches] = useState(editingPlayer?.matches || "");
  const [runs, setRuns] = useState(editingPlayer?.runs || "");
  const [wickets, setWickets] = useState(editingPlayer?.wickets || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !teamName || !jerseyNumber || !role || !battingStyle || !bowlingStyle || !age) {
      alert("Please fill all fields.");
      return;
    }

    const playerData = {
      name,
      teamName,
      jerseyNumber: Number(jerseyNumber),
      role,
      battingStyle,
      bowlingStyle,
      age: Number(age),
      matches: matches ? Number(matches) : 0,
      runs: runs ? Number(runs) : 0,
      wickets: wickets ? Number(wickets) : 0,
    };

    if (editingPlayer) {
      const updatedPlayers = players.map((player) =>
        player.id === editingPlayer.id ? { ...player, ...playerData } : player
      );
      setPlayers(updatedPlayers);
      alert("Player updated successfully!");
    } else {
      const newPlayer = {
        id: Date.now(),
        ...playerData,
        status: "Active",
      };
      setPlayers([...players, newPlayer]);
      alert("Player registered successfully!");
    }

    closeForm();
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
          <User className="w-5 h-5 text-accent dark:text-highlight" />
          <h2 className="font-display font-bold text-base text-slate-855 dark:text-slate-150">
            {editingPlayer ? "Edit Player Profile" : "Register New Player"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left overflow-y-auto max-h-[80vh] pr-1">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Player Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </span>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Assigned Franchise</label>
              <input
                type="text"
                placeholder="Franchise Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Jersey Number</label>
              <input
                type="number"
                placeholder="Jersey No."
                value={jerseyNumber}
                onChange={(e) => setJerseyNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Player Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
              >
                <option value="">Select Role</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-Rounder">All-Rounder</option>
                <option value="Wicketkeeper">Wicketkeeper</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Batting Style</label>
              <select
                value={battingStyle}
                onChange={(e) => setBattingStyle(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
              >
                <option value="">Select Batting</option>
                <option value="Right-hand bat">Right-hand bat</option>
                <option value="Left-hand bat">Left-hand bat</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Bowling Style</label>
              <input
                type="text"
                placeholder="e.g. Right-arm fast"
                value={bowlingStyle}
                onChange={(e) => setBowlingStyle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Matches</label>
              <input
                type="number"
                value={matches}
                onChange={(e) => setMatches(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Runs</label>
              <input
                type="number"
                value={runs}
                onChange={(e) => setRuns(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Wickets</label>
              <input
                type="number"
                value={wickets}
                onChange={(e) => setWickets(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-850">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-accent text-slate-100 font-bold hover:bg-blue-600 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {editingPlayer ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="flex-1 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all text-xs uppercase tracking-wider cursor-pointer"
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
