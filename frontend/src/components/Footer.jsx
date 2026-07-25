import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Mail, Phone, MapPin, Globe, Trophy } from "lucide-react";

function Footer() {
  return (
    <footer className="relative bg-slate-100 dark:bg-[#060b19] border-t border-slate-200 dark:border-slate-900 overflow-hidden pt-16 pb-8 text-slate-600 dark:text-slate-400 transition-colors duration-300">
      {/* Subtle grass green lighting in background */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo & Description column */}
          <div className="md:col-span-2 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <Logo className="h-10 w-auto" textClass="text-slate-900 dark:text-slate-100" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed">
              CricPro is a professional tournament management platform designed for academies, sports clubs, colleges, and professional cricket organizers. Streamline fixtures, scoring, stats, and stand sheets in real-time.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-accent hover:border-accent/40 transition-all duration-300" aria-label="GitHub">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-accent hover:border-accent/40 transition-all duration-300" aria-label="LinkedIn">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-accent hover:border-accent/40 transition-all duration-300" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4 text-left">
            <h3 className="font-display font-semibold text-slate-800 dark:text-slate-200 tracking-wide text-sm uppercase">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-slate-500 hover:text-accent dark:text-slate-400 dark:hover:text-accent text-sm transition-colors duration-200">Home</Link>
              </li>
              <li>
                <a href="#features" className="text-slate-500 hover:text-accent dark:text-slate-400 dark:hover:text-accent text-sm transition-colors duration-200">Features</a>
              </li>
              <li>
                <a href="#stats" className="text-slate-500 hover:text-accent dark:text-slate-400 dark:hover:text-accent text-sm transition-colors duration-200">Statistics</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-slate-500 hover:text-accent dark:text-slate-400 dark:hover:text-accent text-sm transition-colors duration-200">How It Works</a>
              </li>
              <li>
                <Link to="/login" className="text-slate-500 hover:text-accent dark:text-slate-400 dark:hover:text-accent text-sm transition-colors duration-200">Admin Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact / Support Column */}
          <div className="space-y-4 text-left">
            <h3 className="font-display font-semibold text-slate-800 dark:text-slate-200 tracking-wide text-sm uppercase">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>support@cricpro.com</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span className="leading-tight">Gujarat, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Separator */}
        <div className="border-t border-slate-200 dark:border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 dark:text-slate-500 text-xs text-center sm:text-left">
            © 2026 CricPro. All rights reserved.
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-xs text-center sm:text-right">
            Designed & Developed with 💙 by <strong className="text-slate-600 dark:text-slate-355 font-semibold">Dhrumil</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;