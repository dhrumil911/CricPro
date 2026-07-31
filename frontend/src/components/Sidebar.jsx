import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import {
  LayoutDashboard,
  Trophy,
  Users,
  User,
  Calendar,
  Table2,
  TrendingUp,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { path: "/dashboard", name: "Dashboard", icon: LayoutDashboard },
    { path: "/tournaments", name: "Tournaments", icon: Trophy },
    { path: "/teams", name: "Teams", icon: Users },
    { path: "/players", name: "Players", icon: User },
    { path: "/matches", name: "Matches", icon: Calendar },
    { path: "/points", name: "Points Table", icon: Table2 },
    { path: "/reports", name: "Reports & Stats", icon: TrendingUp },
    { path: "/settings", name: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  // Responsive Tablet Collapsing & Mobile Toggling Event Listeners
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else if (window.innerWidth >= 1024) {
        setIsCollapsed(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial trigger

    const handleToggle = () => {
      setIsMobileOpen((prev) => !prev);
    };
    window.addEventListener("toggle-sidebar", handleToggle);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("toggle-sidebar", handleToggle);
    };
  }, []);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-[#080f25] border-r border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-350 transition-colors duration-300">
      {/* Brand Logo Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-850">
        <Link to="/" onClick={() => setIsMobileOpen(false)}>
          <Logo
            className="h-8 w-auto text-slate-900 dark:text-slate-100"
            showText={!isCollapsed}
            textClass="text-slate-900 dark:text-slate-100"
          />
        </Link>

        {/* Collapse button on Desktop/Tablet */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-accent dark:hover:text-highlight hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-250 group relative ${
                active
                  ? "bg-accent/10 dark:bg-accent/15 text-accent dark:text-highlight border-l-2 border-accent dark:border-highlight"
                  : "hover:bg-slate-100 dark:hover:bg-slate-900/40 hover:text-slate-950 dark:hover:text-slate-100 text-slate-600 dark:text-slate-400"
              }`}
            >
              <Icon className={`w-4.5 h-4.5 shrink-0 ${active ? "text-accent dark:text-highlight" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"}`} />
              
              {!isCollapsed && (
                <span className="transition-opacity duration-300">{item.name}</span>
              )}

              {/* Tooltip when collapsed */}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-100 bg-[#0f172a] border border-slate-800 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer / Logout */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-855">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-red-500/10 hover:text-danger transition-all duration-200 group relative cursor-pointer"
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
          
          {isCollapsed && (
            <div className="absolute left-full ml-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-danger bg-[#0f172a] border border-red-900/40 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 whitespace-nowrap">
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop/Tablet Sidebar (hidden on mobile) */}
      <div
        className={`hidden md:block h-screen sticky top-0 shrink-0 transition-all duration-300 z-30 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </div>

      {/* Mobile Drawer (visible only on mobile) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="md:hidden fixed top-0 bottom-0 left-0 w-64 z-50 shadow-2xl"
            >
              <div className="h-full relative">
                {sidebarContent}
                {/* Close Button Inside Menu */}
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-250 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;