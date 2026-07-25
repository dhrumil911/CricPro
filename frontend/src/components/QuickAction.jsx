import { useNavigate } from "react-router-dom";
import { PlusCircle, Trophy, Users, UserPlus, CalendarDays } from "lucide-react";

const getIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes("tournament")) return <Trophy className="w-4 h-4 text-highlight" />;
  if (t.includes("team")) return <Users className="w-4 h-4 text-accent" />;
  if (t.includes("player")) return <UserPlus className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
  if (t.includes("match") || t.includes("schedule")) return <CalendarDays className="w-4 h-4 text-orange-500 dark:text-orange-400" />;
  return <PlusCircle className="w-4 h-4 text-accent" />;
};

function QuickAction({ title, link }) {
  const navigate = useNavigate();

  return (
    <button
      className="glass-card flex items-center justify-between px-5 py-4 rounded-xl border border-slate-250 dark:border-slate-800 hover:border-accent/40 dark:hover:border-accent/40 hover:bg-slate-100/40 dark:hover:bg-slate-850/60 transition-all duration-305 text-left w-full cursor-pointer group"
      onClick={() => navigate(link)}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg group-hover:border-accent/20 transition-colors">
          {getIcon(title)}
        </div>
        <span className="font-sans text-xs font-bold text-slate-655 dark:text-slate-350 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
          {title}
        </span>
      </div>
      <PlusCircle className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-accent transition-colors" />
    </button>
  );
}

export default QuickAction;
