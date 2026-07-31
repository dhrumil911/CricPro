import { Edit, Trash, User, MapPin, Shield, Calendar, Award } from "lucide-react";

function TeamCard({ team, deleteTeam, editTeam }) {
  return (
    <div className="glass-card rounded-2xl border border-slate-250 dark:border-slate-800/80 p-6 flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700/60 transition-all duration-300 relative overflow-hidden text-slate-750 dark:text-slate-200">
      <div className={`absolute top-0 inset-x-0 h-1 ${
        team.status === "Active" ? "bg-accent" : "bg-red-500"
      }`} />

      <div className="space-y-4">
        {/* Title and status */}
        <div className="flex justify-between items-start">
          <div className="text-left flex items-start gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-bold text-accent dark:text-highlight shrink-0 overflow-hidden select-none">
              {team.logo ? (
                <img src={team.logo} alt={team.short_name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              ) : (
                <Shield className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-slate-850 dark:text-slate-200 tracking-wide flex items-center gap-1.5">
                {team.team_name}
              </h3>
              <span className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5 block">Short Name: {team.short_name}</span>
            </div>
          </div>

          <span className={`text-[10px] font-semibold px-2 py-0.5 border rounded-full ${
            team.status === "Active"
              ? "bg-green-500/10 text-accent border-green-500/20"
              : "bg-red-500/10 text-danger border-red-500/20"
          }`}>
            {team.status}
          </span>
        </div>

        {/* Details list */}
        <div className="space-y-2 border-t border-slate-200 dark:border-slate-850 pt-3 text-xs text-slate-655 dark:text-slate-400 text-left">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span><strong className="text-slate-800 dark:text-slate-300">Captain:</strong> {team.captain || "Not Assigned"}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span><strong className="text-slate-800 dark:text-slate-300">Coach:</strong> {team.coach || "Not Assigned"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span><strong className="text-slate-800 dark:text-slate-300">Home Ground:</strong> {team.home_ground || "Not Assigned"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span><strong className="text-slate-800 dark:text-slate-300">Founded Year:</strong> {team.founded_year || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span>
              <strong className="text-slate-800 dark:text-slate-300">Stats:</strong> {team.points} Pts | NRR {team.nrr}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-850">
        <button
          onClick={() => editTeam(team)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-highlight hover:border-accent/40 dark:hover:border-highlight/30 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all cursor-pointer"
        >
          <Edit className="w-3.5 h-3.5" />
          Edit
        </button>
        <button
          onClick={() => deleteTeam(team.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-danger hover:border-danger/40 hover:bg-red-500/5 transition-all cursor-pointer"
        >
          <Trash className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default TeamCard;