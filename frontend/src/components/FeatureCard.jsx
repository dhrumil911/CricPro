import { Trophy, Users, UserCheck, Calendar, Activity, BarChart3, FileText } from "lucide-react";

const getIcon = (title) => {
  switch (title.toLowerCase()) {
    case "tournament":
    case "tournament management":
      return <Trophy className="w-5 h-5 text-highlight" />;
    case "teams":
    case "team management":
      return <Users className="w-5 h-5 text-accent" />;
    case "players":
    case "player profiles":
      return <UserCheck className="w-5 h-5 text-blue-500 dark:text-blue-400" />;
    case "matches":
    case "match scheduling":
      return <Calendar className="w-5 h-5 text-orange-500 dark:text-orange-400" />;
    case "live scoring":
      return <Activity className="w-5 h-5 text-red-550 dark:text-red-400 animate-pulse" />;
    case "points table":
      return <BarChart3 className="w-5 h-5 text-purple-550 dark:text-purple-400" />;
    case "reports & analytics":
      return <FileText className="w-5 h-5 text-emerald-555 dark:text-emerald-400" />;
    default:
      return <Trophy className="w-5 h-5 text-accent" />;
  }
};

function FeatureCard({ icon, title, description }) {
  return (
    <div className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col items-start gap-4 border border-slate-250 dark:border-slate-800/80 text-left">
      {/* Icon frame with accent backdrop */}
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 flex items-center justify-center shadow-sm">
        {getIcon(title) || <span className="text-xl">{icon}</span>}
      </div>

      <h3 className="font-display font-bold text-base text-slate-850 dark:text-slate-100 tracking-wide">{title}</h3>

      <p className="font-sans text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}

export default FeatureCard;