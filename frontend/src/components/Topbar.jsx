import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, User, ChevronDown, CheckCircle, Trophy, LogOut, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

function Topbar() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: "RCB vs GT Match Scheduled", desc: "Champions Cup final scheduled at 8:00 PM.", time: "10m ago", icon: Trophy, color: "text-amber-400" },
    { id: 2, title: "Mumbai Indians Won!", desc: "MI defeated CSK by 8 wickets.", time: "2h ago", icon: CheckCircle, color: "text-green-555" },
    { id: 3, title: "Tournament Added", desc: "IPL 2026 was successfully initialized.", time: "1d ago", icon: Shield, color: "text-blue-500" },
  ];

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between w-full h-16 px-6 bg-white/80 dark:bg-[#080f25]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-colors">
      {/* Search Input */}
      <div className="relative w-64 md:w-80 max-w-lg hidden sm:block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        </span>
        <input
          type="text"
          placeholder="Search tournaments, teams, players..."
          className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-accent text-slate-850 dark:text-slate-200 placeholder-slate-450 dark:placeholder-slate-550 transition-colors"
        />
      </div>

      <div className="sm:hidden font-display font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-350">
        Admin <span className="text-accent">Panel</span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3.5 ml-auto">
        {/* Reusable Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full animate-ping" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2.5 w-80 bg-white dark:bg-[#0f172a]/95 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl z-20 py-1 overflow-hidden"
                >
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between">
                    <span className="font-display font-bold text-xs text-slate-700 dark:text-slate-200 uppercase tracking-wider">Notifications</span>
                    <span className="text-[9px] text-accent font-bold px-2 py-0.5 bg-accent/10 rounded-full">New</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-850">
                    {notifications.map((notif) => {
                      const Icon = notif.icon;
                      return (
                        <div key={notif.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer text-left">
                          <div className="flex gap-3">
                            <div className="p-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mt-0.5 shrink-0">
                              <Icon className={`w-3.5 h-3.5 ${notif.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-sans font-semibold text-xs text-slate-800 dark:text-slate-200 truncate">{notif.title}</h4>
                              <p className="font-sans text-[10px] text-slate-500 dark:text-slate-450 leading-normal mt-0.5">{notif.desc}</p>
                              <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 block font-mono">{notif.time}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800/80" />

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 text-left hover:opacity-90 transition-opacity"
          >
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-highlight p-0.5">
              <div className="flex items-center justify-center w-full h-full bg-white dark:bg-[#020617] rounded-[10px]">
                <User className="w-4 h-4 text-accent dark:text-highlight" />
              </div>
            </div>
            <div className="hidden md:block text-left">
              <div className="font-sans font-bold text-xs text-slate-800 dark:text-slate-200 leading-none">
                {localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")).name.split(" ")[0] + " " + (localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")).name.split(" ")[1]?.charAt(0) + "." : "") : "Dhrumil D."}
              </div>
              <span className="font-sans text-[9px] text-slate-450 dark:text-slate-500 uppercase font-semibold block mt-0.5">Director</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-550 dark:text-slate-450 hidden md:block" />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2.5 w-48 bg-white dark:bg-[#0f172a]/95 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl z-20 py-1 overflow-hidden"
                >
                  <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-850 text-left">
                    <span className="font-sans font-bold text-xs text-slate-700 dark:text-slate-330 block">
                      {localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")).name : "Dhrumil Dholakiya"}
                    </span>
                    <span className="font-sans text-[10px] text-slate-400 dark:text-slate-500">
                      {localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")).email : "admin@cricpro.com"}
                    </span>
                  </div>
                  
                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-655 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-left"
                  >
                    <User className="w-3.5 h-3.5" />
                    Admin Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-655 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-left"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Settings
                  </Link>
                  
                  <div className="border-t border-slate-100 dark:border-slate-850 mt-1" />
                  
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("admin");
                      setShowProfileMenu(false);
                      navigate("/");
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-xs text-danger hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}

export default Topbar;
