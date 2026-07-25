import { useState, useEffect } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#020617]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* SVG Logo Branding */}
          <Link to="/">
            <Logo className="h-9 w-auto text-slate-900 dark:text-slate-100" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-sans font-semibold text-xs tracking-wider uppercase nav-link-underline transition-all duration-200 ${
                isActive("/")
                  ? "text-accent dark:text-highlight"
                  : "text-slate-650 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              Home
            </Link>
            <a
              href="#features"
              className="font-sans font-semibold text-xs tracking-wider uppercase nav-link-underline text-slate-650 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#stats"
              className="font-sans font-semibold text-xs tracking-wider uppercase nav-link-underline text-slate-650 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200"
            >
              Statistics
            </a>
            <a
              href="#how-it-works"
              className="font-sans font-semibold text-xs tracking-wider uppercase nav-link-underline text-slate-650 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200"
            >
              How It Works
            </a>
          </div>

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Switcher */}
            <ThemeToggle />

            <Link
              to="/login"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-650 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200"
            >
              <LogIn className="w-3.5 h-3.5" />
              Login
            </Link>
            
            <Link
              to="/dashboard"
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-950 bg-gradient-to-br from-highlight to-amber-300 hover:from-amber-300 hover:to-highlight rounded-xl transition-all duration-300 shadow-md shadow-highlight/10 flex items-center gap-2"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50 focus:outline-none"
            >
              {isOpen ? <X className="block h-5 w-5" /> : <Menu className="block h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#020617]/95 backdrop-blur-lg"
          >
            <div className="px-3 pt-2 pb-4 space-y-1 sm:px-3 text-left">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                  isActive("/")
                    ? "bg-slate-100 dark:bg-slate-800 text-accent dark:text-highlight"
                    : "text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                Home
              </Link>
              <a
                href="#features"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-100"
              >
                Features
              </a>
              <a
                href="#stats"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-100"
              >
                Statistics
              </a>
              <a
                href="#how-it-works"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-100"
              >
                How It Works
              </a>
              
              <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-2 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:bg-slate-550/10"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-highlight to-amber-300 text-slate-950"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;