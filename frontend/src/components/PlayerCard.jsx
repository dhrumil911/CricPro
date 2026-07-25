import { Edit, Trash, User, Award, Shield, Compass, Calendar, ChevronRight } from "lucide-react";

function PlayerCard({ player, deletePlayer, editPlayer }) {
  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "batsman":
        return "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20";
      case "bowler":
        return "bg-red-500/10 text-danger border-red-500/20";
      case "all-rounder":
        return "bg-purple-500/10 text-purple-500 dark:text-purple-450 border-purple-500/20";
      case "wicket keeper":
      default:
        return "bg-yellow-500/10 text-yellow-600 dark:text-highlight border-yellow-500/20";
    }
  };

  return (
    <div className="glass-card rounded-2xl border border-slate-250 dark:border-slate-800/80 p-6 flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700/60 transition-all duration-300 relative overflow-hidden text-slate-750 dark:text-slate-200">
      <div className={`absolute top-0 inset-x-0 h-1 ${
        player.status === "Active" ? "bg-accent" : "bg-slate-500"
      }`} />

      <div className="space-y-4">
        {/* Top Info Header */}
        <div className="flex justify-between items-start">
          <div className="text-left">
            <h3 className="font-display font-bold text-base text-slate-850 dark:text-slate-200 tracking-wide flex items-center gap-1.5">
              <User className="w-4.5 h-4.5 text-accent" />
              {player.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-slate-505 dark:text-slate-500 font-semibold uppercase">{player.teamName}</span>
              <span className="text-slate-250 dark:text-slate-705 text-[10px]">•</span>
              <span className="text-[10px] text-accent font-mono font-bold">#{player.jerseyNumber}</span>
            </div>
          </div>

          <span className={`text-[10px] font-semibold px-2.5 py-0.5 border rounded-full ${getRoleColor(player.role)}`}>
            {player.role}
          </span>
        </div>

        {/* Career Summary Badges */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-200 dark:border-slate-850 text-center">
          <div>
            <div className="text-slate-500 text-[9px] uppercase font-bold tracking-wide">Matches</div>
            <div className="font-display font-bold text-sm text-slate-805 dark:text-slate-200 mt-0.5">{player.matches}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[9px] uppercase font-bold tracking-wide">Runs</div>
            <div className="font-display font-bold text-sm text-slate-805 dark:text-slate-200 mt-0.5">{player.runs}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[9px] uppercase font-bold tracking-wide">Wickets</div>
            <div className="font-display font-bold text-sm text-slate-805 dark:text-slate-200 mt-0.5">{player.wickets}</div>
          </div>
        </div>

        {/* Styles Detail */}
        <div className="space-y-2 text-xs text-slate-655 dark:text-slate-400 text-left">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-[11px]">Batting Style</span>
            <span className="text-slate-750 dark:text-slate-350 font-semibold">{player.battingStyle}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-[11px]">Bowling Style</span>
            <span className="text-slate-750 dark:text-slate-350 font-semibold">{player.bowlingStyle}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-[11px]">Age</span>
            <span className="text-slate-750 dark:text-slate-350 font-semibold">{player.age} Years</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-850">
        <button
          onClick={() => editPlayer(player)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-highlight hover:border-accent/40 dark:hover:border-highlight/30 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all cursor-pointer"
        >
          <Edit className="w-3.5 h-3.5" />
          Edit
        </button>
        <button
          onClick={() => deletePlayer(player.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-danger hover:border-danger/40 hover:bg-red-500/5 transition-all cursor-pointer"
        >
          <Trash className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default PlayerCard;
