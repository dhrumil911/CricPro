import { CheckCircle2 } from "lucide-react";

function PointsTableRow({ team, position, isQualified }) {
  return (
    <tr className={`border-b border-slate-200 dark:border-slate-850 hover:bg-slate-100/40 dark:hover:bg-slate-900/35 transition-colors ${
      isQualified ? "bg-accent/[0.02] dark:bg-accent/[0.02]" : ""
    }`}>
      {/* Position */}
      <td className="px-4 py-3.5 text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          {isQualified && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}
          {position}
        </div>
      </td>

      {/* Team Name and Badge */}
      <td className="px-4 py-3.5 text-xs font-semibold text-slate-850 dark:text-slate-200">
        <div className="flex items-center gap-2">
          <span className="truncate">{team.name}</span>
          {isQualified && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-bold rounded bg-accent/15 text-accent border border-accent/20 tracking-wider">
              Q
            </span>
          )}
        </div>
      </td>

      {/* Stats */}
      <td className="px-4 py-3.5 text-xs text-slate-600 dark:text-slate-350">{team.matchesPlayed}</td>
      <td className="px-4 py-3.5 text-xs text-slate-800 dark:text-slate-300 font-medium">{team.wins}</td>
      <td className="px-4 py-3.5 text-xs text-slate-500 dark:text-slate-400">{team.losses}</td>
      <td className="px-4 py-3.5 text-xs text-slate-500 dark:text-slate-400">{team.ties}</td>
      <td className="px-4 py-3.5 text-xs text-slate-500 dark:text-slate-400">{team.noResult}</td>

      {/* Points */}
      <td className="px-4 py-3.5 text-xs font-bold text-slate-800 dark:text-slate-150">{team.points}</td>

      {/* NRR */}
      <td className={`px-4 py-3.5 text-xs font-mono font-semibold ${
        team.nrr >= 0 ? "text-accent" : "text-danger"
      }`}>
        {team.nrr > 0 ? `+${team.nrr.toFixed(3)}` : team.nrr.toFixed(3)}
      </td>
    </tr>
  );
}

export default PointsTableRow;
