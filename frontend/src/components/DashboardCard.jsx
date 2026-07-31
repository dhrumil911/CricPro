import { Trophy, Users, User, Calendar, CheckCircle, Clock } from "lucide-react";

const getIcon = (title) => {
  switch (title.toLowerCase()) {
    case "tournaments":
      return <Trophy className="w-5 h-5 text-highlight" />;
    case "teams":
      return <Users className="w-5 h-5 text-accent" />;
    case "players":
      return <User className="w-5 h-5 text-blue-500 dark:text-blue-400" />;
    case "matches":
      return <Calendar className="w-5 h-5 text-orange-500 dark:text-orange-400" />;
    case "completed matches":
      return <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />;
    case "upcoming matches":
      return <Clock className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />;
    default:
      return <Trophy className="w-5 h-5 text-accent" />;
  }
};

function DashboardCard({ number, title, icon }) {
  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-250 dark:border-slate-800/80 hover:border-slate-400 dark:hover:border-slate-700/60 transition-all duration-300 flex items-center gap-5">
      <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 flex items-center justify-center shrink-0">
        {getIcon(title) || <span className="text-xl">{icon}</span>}
      </div>

      <div className="text-left">
        <div className="font-display font-extrabold text-2xl text-slate-850 dark:text-slate-100 tracking-tight leading-none">
          {number}
        </div>
        <div className="font-sans text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
          {title}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;