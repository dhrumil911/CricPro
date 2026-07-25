import { useState } from "react";
import { X, Calendar, Save, MapPin, Clock, ShieldAlert } from "lucide-react";

function MatchForm({ matches, setMatches, closeForm, editingMatch }) {
  const [tournamentName, setTournamentName] = useState(editingMatch?.tournamentName || "");
  const [teamA, setTeamA] = useState(editingMatch?.teamA || "");
  const [teamB, setTeamB] = useState(editingMatch?.teamB || "");
  const [matchDate, setMatchDate] = useState(editingMatch?.matchDate || "");
  const [matchTime, setMatchTime] = useState(editingMatch?.matchTime || "");
  const [venue, setVenue] = useState(editingMatch?.venue || "");
  const [matchType, setMatchType] = useState(editingMatch?.matchType || "");
  const [umpire, setUmpire] = useState(editingMatch?.umpire || "");
  const [tossWinner, setTossWinner] = useState(editingMatch?.tossWinner || "");
  const [batFirst, setBatFirst] = useState(editingMatch?.batFirst || "");
  const [status, setStatus] = useState(editingMatch?.status || "Upcoming");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tournamentName || !teamA || !teamB || !matchDate || !matchTime || !venue || !matchType) {
      alert("Please fill all required fields.");
      return;
    }

    if (teamA === teamB) {
      alert("Team A and Team B cannot be the same.");
      return;
    }

    const matchData = {
      tournamentName,
      teamA,
      teamB,
      matchDate,
      matchTime,
      venue,
      matchType,
      umpire,
      tossWinner,
      batFirst,
      status,
    };

    if (editingMatch) {
      const updatedMatches = matches.map((match) =>
        match.id === editingMatch.id ? { ...match, ...matchData } : match
      );
      setMatches(updatedMatches);
      alert("Match updated successfully!");
    } else {
      const newMatch = {
        id: Date.now(),
        ...matchData,
      };
      setMatches([...matches, newMatch]);
      alert("Match scheduled successfully!");
    }

    closeForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeForm} />

      <div className="relative w-full max-w-lg glass-card rounded-2xl border border-slate-250 dark:border-slate-800 shadow-2xl p-6 overflow-hidden z-10">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-accent to-highlight" />

        <button
          onClick={closeForm}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-accent dark:text-highlight" />
          <h2 className="font-display font-bold text-base text-slate-855 dark:text-slate-150">
            {editingMatch ? "Modify Fixture" : "Schedule New Match"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left overflow-y-auto max-h-[80vh] pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Tournament League</label>
              <input
                type="text"
                placeholder="e.g. IPL 2026"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Match Stage Type</label>
              <input
                type="text"
                placeholder="e.g. League, Semifinal, Final"
                value={matchType}
                onChange={(e) => setMatchType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Team A (Home)</label>
              <input
                type="text"
                placeholder="Team A Name"
                value={teamA}
                onChange={(e) => setTeamA(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Team B (Away)</label>
              <input
                type="text"
                placeholder="Team B Name"
                value={teamB}
                onChange={(e) => setTeamB(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Match Date</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="date"
                  value={matchDate}
                  onChange={(e) => setMatchDate(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Start Time (IST)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  type="time"
                  value={matchTime}
                  onChange={(e) => setMatchTime(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Venue / Arena</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </span>
              <input
                type="text"
                placeholder="Stadium Name"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Lead Umpire</label>
              <input
                type="text"
                placeholder="Umpire Name"
                value={umpire}
                onChange={(e) => setUmpire(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Toss Decision Winner</label>
              <input
                type="text"
                placeholder="Winner Name"
                value={tossWinner}
                onChange={(e) => setTossWinner(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Batting First Team</label>
              <input
                type="text"
                placeholder="Batting Team Name"
                value={batFirst}
                onChange={(e) => setBatFirst(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-slate-200 text-xs placeholder-slate-450 dark:placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">Fixture Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Live">Live</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-850">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-accent text-slate-100 font-bold hover:bg-blue-600 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {editingMatch ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="flex-1 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-855 transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MatchForm;
