import { Edit, Trash, Calendar, Clock, MapPin, Award } from "lucide-react";

function MatchCard({ match, deleteMatch, editMatch }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Live":
        return "bg-red-500/10 text-danger border-red-500/20";
      case "Completed":
        return "bg-green-500/10 text-accent dark:text-accent border-green-500/20";
      case "Upcoming":
      default:
        return "bg-yellow-500/10 text-highlight dark:text-highlight border-yellow-500/20";
    }
  };

  const getLiveTelemetry = (status) => {
    if (status === "Live") {
      const progressPct = (5.5 / 20) * 100;
      return (
        <div className="mt-4 p-4 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider text-danger">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              Live Broadcast Telemetry
            </span>
            <span className="font-mono">Overs 5.3 / 20</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-300/40 dark:border-slate-800">
            <div className="bg-gradient-to-r from-red-500 to-highlight h-1.5 rounded-full shadow-none dark:shadow-[0_0_10px_rgba(239,68,68,0.2)]" style={{ width: `${progressPct}%` }} />
          </div>

          {/* Score details */}
          <div className="text-center py-1">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Current Batting Score</div>
            <div className="font-display font-extrabold text-base text-slate-850 dark:text-slate-100 flex items-center justify-center gap-2 mt-0.5">
              <span>RCB 184/5 <span className="text-xs text-slate-400 dark:text-slate-550 font-normal">(20)</span></span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span>GT 42/2 <span className="text-xs text-slate-400 dark:text-slate-550 font-normal">(5.3)</span></span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Gujarat Titans need 143 runs from 87 balls.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-2 bg-white/55 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-xl text-center shadow-sm dark:shadow-none">
              <span className="text-[9px] text-slate-500 uppercase font-semibold block">Current Run Rate</span>
              <span className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 mt-0.5 block">7.64</span>
            </div>
            <div className="p-2 bg-white/55 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-xl text-center shadow-sm dark:shadow-none">
              <span className="text-[9px] text-slate-500 uppercase font-semibold block">Required Run Rate</span>
              <span className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 mt-0.5 block">9.86</span>
            </div>
          </div>

          <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-450 border-t border-slate-200/60 dark:border-slate-855/60 pt-2 font-semibold uppercase tracking-wider">
            <span>Overs Left: <strong className="text-slate-750 dark:text-slate-200 font-mono">14.3</strong></span>
            <span>Wickets Left: <strong className="text-slate-750 dark:text-slate-200 font-mono">8</strong></span>
          </div>
        </div>
      );
    }
    if (status === "Completed") {
      return (
        <div className="mt-4 p-4 bg-slate-50/60 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-2xl text-center space-y-1">
          <div className="text-[9px] text-accent font-bold uppercase tracking-wider">Match Outcome Summary</div>
          <div className="font-display font-extrabold text-xs text-slate-800 dark:text-slate-200">
            MI 164/2 (17.4) def CSK 162/6 (20)
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Mumbai Indians won by 8 wickets.</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-2xl border border-slate-250 dark:border-slate-800/80 p-6 flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700/60 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 relative overflow-hidden text-slate-800 dark:text-slate-200">
      {/* Top status color bar (thinner accent) */}
      <div className={`absolute top-0 inset-x-0 h-0.5 ${
        match.status === "Live" ? "bg-red-500/80" : match.status === "Completed" ? "bg-accent/80" : "bg-highlight/80"
      }`} />

      <div className="space-y-4">
        {/* Card Header */}
        <div className="flex justify-between items-start">
          <div className="text-left">
            <h3 className="font-display font-bold text-base text-slate-850 dark:text-slate-100 tracking-wide flex items-center gap-1.5">
              <Award className="w-4.5 h-4.5 text-highlight" />
              {match.tournamentName}
            </h3>
            <span className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5 block">{match.matchType} Match</span>
          </div>

          <span className={`text-[10px] font-bold px-2.5 py-0.5 border rounded-full ${getStatusStyle(match.status)}`}>
            {match.status}
          </span>
        </div>

        {/* Teams head-to-head */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-xl flex items-center justify-between text-center">
          <div className="flex-1 space-y-1">
            <span className="text-[9px] uppercase font-bold text-slate-450 dark:text-slate-550 block">Team A</span>
            <span className="font-display font-extrabold text-xs text-slate-800 dark:text-slate-200">{match.teamA}</span>
          </div>
          <div className="px-2 py-0.5 text-[9px] font-bold text-highlight bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-850 rounded uppercase tracking-wider shrink-0 mx-2 shadow-sm">
            VS
          </div>
          <div className="flex-1 space-y-1">
            <span className="text-[9px] uppercase font-bold text-slate-450 dark:text-slate-555 block">Team B</span>
            <span className="font-display font-extrabold text-xs text-slate-800 dark:text-slate-200">{match.teamB}</span>
          </div>
        </div>

        {/* Scheduling Details */}
        <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-850 pt-3 text-left">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span>{match.matchDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span>{match.matchTime} IST</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="truncate">{match.venue}</span>
          </div>
        </div>

        {/* Toss & Umpire */}
        {match.umpire && (
          <div className="border-t border-slate-200/60 dark:border-slate-850/50 pt-2.5 space-y-1 text-[10px] text-slate-500 dark:text-slate-450 font-sans text-left">
            <div className="flex justify-between">
              <span>Umpire:</span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold">{match.umpire}</span>
            </div>
            <div className="flex justify-between">
              <span>Toss:</span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold">{match.tossWinner} ({match.batFirst === match.tossWinner ? "Batting" : "Bowling"})</span>
            </div>
          </div>
        )}

        {/* Dynamic Static Score Details */}
        {getLiveTelemetry(match.status)}
      </div>

      {/* Action triggers */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-850">
        <button
          onClick={() => editMatch(match)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-highlight hover:border-accent/40 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all cursor-pointer"
        >
          <Edit className="w-3.5 h-3.5" />
          Edit
        </button>
        <button
          onClick={() => deleteMatch(match.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-danger hover:border-danger/40 hover:bg-red-500/5 transition-all cursor-pointer"
        >
          <Trash className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default MatchCard;
