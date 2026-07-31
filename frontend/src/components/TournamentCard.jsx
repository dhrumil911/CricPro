import { Edit, Trash, MapPin, Calendar, Users, Award, Hash, Trophy } from "lucide-react";

function TournamentCard({ tournament, deleteTournament, editTournament }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-green-500/10 text-accent border-green-500/20";
      case "Upcoming":
        return "bg-yellow-500/10 text-highlight border-yellow-500/20";
      case "Completed":
        return "bg-slate-550/10 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700/30";
      default:
        return "bg-slate-550/10 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700/30";
    }
  };

  return (
    <div className="glass-card rounded-2xl border border-slate-250 dark:border-slate-800/80 p-6 flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700/60 transition-all duration-300 relative overflow-hidden text-slate-750 dark:text-slate-200">
      {/* Visual top indicator bar based on status */}
      <div className={`absolute top-0 inset-x-0 h-1 ${
        tournament.status === "Ongoing" ? "bg-accent" : tournament.status === "Upcoming" ? "bg-highlight" : "bg-slate-500"
      }`} />
      
      <div className="space-y-4">
        {/* Title & Format */}
        <div className="flex justify-between items-start">
          <div className="text-left">
            <h3 className="font-display font-bold text-base text-slate-850 dark:text-slate-200 tracking-wide flex items-center gap-1.5">
              <Award className="w-4 h-4 text-highlight animate-pulse" />
              {tournament.name}
            </h3>
            <span className="text-[10px] text-slate-500 dark:text-slate-450 font-semibold uppercase mt-0.5 block">{tournament.format} Format</span>
          </div>
          
          <span className={`text-[10px] font-semibold px-2 py-0.5 border rounded-full ${getStatusBadge(tournament.status)}`}>
            {tournament.status}
          </span>
        </div>

        {/* Description (if exists) */}
        {tournament.description && (
          <p className="text-[11px] text-slate-500 dark:text-slate-450 text-left line-clamp-2 leading-relaxed">
            {tournament.description}
          </p>
        )}

        {/* Metadata Details */}
        <div className="space-y-2 border-t border-slate-200/60 dark:border-slate-850 pt-3 text-xs text-slate-600 dark:text-slate-400 text-left">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span><strong className="text-slate-800 dark:text-slate-300">Venue:</strong> {tournament.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span><strong className="text-slate-800 dark:text-slate-300">Teams:</strong> {tournament.total_teams} Registered</span>
          </div>
          <div className="flex items-center gap-2">
            <Hash className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span><strong className="text-slate-800 dark:text-slate-300">Overs:</strong> {tournament.overs} overs / innings</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span><strong className="text-slate-800 dark:text-slate-300">Duration:</strong> {tournament.start_date} to {tournament.end_date}</span>
          </div>
          
          {tournament.status === "Completed" && tournament.winner_team && (
            <div className="flex items-center gap-2 mt-2 p-2 bg-highlight/10 dark:bg-highlight/5 border border-highlight/20 rounded-lg">
              <Trophy className="w-3.5 h-3.5 text-highlight shrink-0 animate-bounce" />
              <span><strong className="text-slate-800 dark:text-slate-300">Champion:</strong> {tournament.winner_team}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-850">
        <button
          onClick={() => editTournament(tournament)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-highlight hover:border-accent/40 dark:hover:border-highlight/30 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all cursor-pointer"
        >
          <Edit className="w-3.5 h-3.5" />
          Edit
        </button>
        <button
          onClick={() => deleteTournament(tournament.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-550 dark:text-slate-400 hover:text-danger hover:border-danger/40 hover:bg-red-500/5 transition-all cursor-pointer"
        >
          <Trash className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default TournamentCard;