import { useState, useEffect } from "react";
import { Trophy, Users, User, Calendar, CheckCircle, Hourglass } from "lucide-react";

const getStatIcon = (title) => {
  switch (title.toLowerCase()) {
    case "tournaments":
    case "total tournaments":
      return <Trophy className="w-5 h-5 text-highlight" />;
    case "teams":
    case "total teams":
      return <Users className="w-5 h-5 text-accent" />;
    case "players":
    case "total players":
      return <User className="w-5 h-5 text-blue-500 dark:text-blue-400" />;
    case "matches":
    case "total matches":
      return <Calendar className="w-5 h-5 text-orange-500 dark:text-orange-400" />;
    case "completed matches":
      return <CheckCircle className="w-5 h-5 text-green-555 dark:text-green-400" />;
    case "upcoming matches":
      return <Hourglass className="w-5 h-5 text-slate-500 dark:text-slate-450 animate-pulse" />;
    default:
      return <Trophy className="w-5 h-5 text-accent" />;
  }
};

function StatCard({ icon, number, title, value }) {
  const displayValue = value ?? number;
  const numericVal = parseInt(displayValue, 10);
  const isNumeric = !isNaN(numericVal) && String(displayValue).trim() !== "" && !String(displayValue).includes("-") && !String(displayValue).includes("/");

  const [count, setCount] = useState(isNumeric ? 0 : displayValue);

  useEffect(() => {
    if (!isNumeric) {
      setCount(displayValue);
      return;
    }
    
    let start = 0;
    const end = numericVal;
    if (start === end) return;
    
    const duration = 1.2;
    const totalFrames = 60;
    const increment = end / totalFrames;
    const stepTime = (duration * 1000) / totalFrames;
    
    let currentFrame = 0;
    const timer = setInterval(() => {
      currentFrame++;
      const nextCount = Math.floor(increment * currentFrame);
      if (currentFrame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(nextCount);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [displayValue, isNumeric, numericVal]);

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-250 dark:border-slate-800/80 flex items-center gap-5 hover:border-slate-350 dark:hover:border-slate-700/60 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
      <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 flex items-center justify-center shrink-0 shadow-sm">
        {getStatIcon(title) || <span className="text-xl">{icon}</span>}
      </div>

      <div className="text-left">
        <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-850 dark:text-slate-100 tracking-tight">
          {isNumeric ? count.toLocaleString() : count}
        </div>
        <div className="font-sans text-[10px] text-slate-500 dark:text-slate-450 uppercase font-bold tracking-wider mt-0.5">{title}</div>
      </div>
    </div>
  );
}

export default StatCard;