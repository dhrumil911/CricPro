import { Edit, Trash, User, Award, Shield, Compass, Calendar, ChevronRight } from "lucide-react";

function PlayerCard({ player, deletePlayer, editPlayer }) {
  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-accent border-green-500/20";
      case "Injured":
        return "bg-red-500/10 text-danger border-red-500/20";
      case "Retired":
      default:
        return "bg-slate-500/10 text-slate-455 border-slate-500/20";
    }
  };

  return (
    <div className="glass-card rounded-2xl border border-slate-250 dark:border-slate-800/80 p-6 flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700/60 transition-all duration-300 relative overflow-hidden text-slate-750 dark:text-slate-200">
      <div className={`absolute top-0 inset-x-0 h-1 ${
        player.status === "Active" ? "bg-accent" : player.status === "Injured" ? "bg-red-500" : "bg-slate-500"
      }`} />

      <div className="space-y-4">
        {/* Top Info Header */}
        <div className="flex justify-between items-start">
          <div className="text-left flex items-start gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-bold text-accent dark:text-highlight shrink-0 overflow-hidden select-none">
              {player.profile_image ? (
                <img src={player.profile_image} alt={player.player_name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-slate-850 dark:text-slate-200 tracking-wide flex items-center gap-1.5">
                {player.player_name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] text-slate-505 dark:text-slate-500 font-semibold uppercase">{player.team_short_name || player.team_name || "Free Agent"}</span>
                <span className="text-slate-250 dark:text-slate-700 text-[10px]">•</span>
                <span className="text-[10px] text-accent font-mono font-bold">#{player.jersey_number || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className={`text-[9px] font-semibold px-2 py-0.5 border rounded-full ${getRoleColor(player.role)}`}>
              {player.role}
            </span>
            <span className={`text-[9px] font-semibold px-2 py-0.5 border rounded-full ${getStatusColor(player.status)}`}>
              {player.status}
            </span>
          </div>
        </div>

        {/* Career Summary Badges */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-200 dark:border-slate-850 text-center">
          <div>
            <div className="text-slate-500 text-[9px] uppercase font-bold tracking-wide">Matches</div>
            <div className="font-display font-bold text-xs text-slate-805 dark:text-slate-200 mt-0.5">{player.matches_played}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[9px] uppercase font-bold tracking-wide">Runs</div>
            <div className="font-display font-bold text-xs text-slate-805 dark:text-slate-200 mt-0.5">{player.runs}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[9px] uppercase font-bold tracking-wide">Wickets</div>
            <div className="font-display font-bold text-xs text-slate-805 dark:text-slate-200 mt-0.5">{player.wickets}</div>
          </div>
        </div>

        {/* Styles Detail */}
        <div className="space-y-2 text-xs text-slate-655 dark:text-slate-400 text-left">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-[11px]">Batting Style</span>
            <span className="text-slate-750 dark:text-slate-350 font-semibold">{player.batting_style || "N/A"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-[11px]">Bowling Style</span>
            <span className="text-slate-750 dark:text-slate-350 font-semibold">{player.bowling_style || "N/A"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-[11px]">Nationality</span>
            <span className="text-slate-750 dark:text-slate-350 font-semibold">{player.nationality || "N/A"}</span>
          </div>
          {player.strike_rate > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[11px]">SR / Economy</span>
              <span className="text-slate-750 dark:text-slate-350 font-semibold">{player.strike_rate} / {player.economy}</span>
            </div>
          )}
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
