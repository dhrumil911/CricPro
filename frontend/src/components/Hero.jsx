import { Link } from "react-router-dom";
import { Play, ChevronRight, Trophy, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

function Hero() {
  const progressPct = (5.5 / 20) * 100;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[var(--bg-color)] transition-colors duration-300">
      
      {/* Absolute decorative layers at -z-10 */}
      <div className="absolute inset-0 pointer-events-none -z-10 pitch-texture" />
      <div className="absolute inset-0 pointer-events-none -z-10 stadium-silhouette" />

      {/* Stadium Floodlight lights & glows */}
      <div className="stadium-glow top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" />
      <div className="stadium-glow top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2" />
      
      <div className="absolute top-0 left-1/4 w-1 h-96 bg-gradient-to-b from-accent/10 dark:from-accent/20 to-transparent blur-[1px] rotate-[20deg]" />
      <div className="absolute top-0 right-1/4 w-1.5 h-96 bg-gradient-to-b from-highlight/10 dark:from-highlight/20 to-transparent blur-[2px] -rotate-[15deg]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-highlight tracking-wider shadow-sm dark:shadow-lg transition-colors"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-highlight animate-pulse" />
              <span>🏆 Trusted by Tournament Organizers</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.1]"
            >
              Organize Cricket <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-blue-600 to-highlight dark:from-accent dark:via-blue-400 dark:to-highlight">
                Like A Pro League
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-655 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Streamline tournaments, schedule fixtures, profile players, manage rosters, and broadcast live scores from a single premium sports administration dashboard.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-accent text-slate-100 hover:bg-blue-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Get Started Now</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm dark:shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-slate-500 text-slate-500 dark:fill-slate-350 dark:text-slate-350" />
                <span>Explore Live Demo</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-6 pt-6 text-slate-450 dark:text-slate-500 text-[10px] uppercase font-bold tracking-wider"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent dark:text-highlight" />
                <span>Secure Control Panel</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-highlight" />
                <span>Standings Analytics</span>
              </div>
            </motion.div>
          </div>

          {/* Right graphics column - Live match card scaled up by 15% (max-w-[410px]) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Background trophy glow effect */}
            <div className="absolute w-72 h-72 rounded-full bg-highlight/5 blur-[50px] pointer-events-none" />

            {/* Premium Showcase Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[410px] glass-card glow-blue rounded-2xl p-6 border border-slate-250 dark:border-slate-800/80 shadow-lg dark:shadow-2xl"
            >
              <div className="absolute top-0 inset-x-0 h-0.5 bg-red-500/80" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-1.5 text-[9px] uppercase font-extrabold tracking-widest text-danger px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  Live Broadcast
                </span>
                <span className="text-[10px] font-semibold text-slate-500">Champions Cup</span>
              </div>

              {/* Head-to-Head */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-xl flex items-center justify-between text-center">
                <div className="flex-1 space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-450 dark:text-slate-500 block">Team A</span>
                  <span className="font-display font-extrabold text-xs text-slate-850 dark:text-slate-200">RCB</span>
                </div>
                <div className="px-2 py-0.5 text-[9px] font-bold text-highlight bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-850 rounded uppercase tracking-wider shrink-0 mx-2 shadow-sm">
                  VS
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-450 dark:text-slate-500 block">Team B</span>
                  <span className="font-display font-extrabold text-xs text-slate-850 dark:text-slate-200">GT</span>
                </div>
              </div>

              {/* Live Broadcast Telemetry */}
              <div className="mt-4 p-4 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-2xl space-y-3 text-left">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-danger">
                  <span>Match Progress</span>
                  <span className="font-mono">Overs 5.3 / 20</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-300/40 dark:border-slate-850">
                  <div className="bg-gradient-to-r from-red-500 to-highlight h-1.5 rounded-full" style={{ width: `${progressPct}%` }} />
                </div>

                {/* Score details */}
                <div className="text-center py-1">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Current Score</div>
                  <div className="font-display font-extrabold text-base text-slate-850 dark:text-slate-100 flex items-center justify-center gap-2 mt-0.5">
                    <span>RCB 184/5 <span className="text-xs text-slate-400 font-normal">(20)</span></span>
                    <span className="text-slate-350 dark:text-slate-700">•</span>
                    <span>GT 42/2 <span className="text-xs text-slate-400 font-normal">(5.3)</span></span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Gujarat Titans need 143 runs from 87 balls.</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-xl text-center shadow-sm dark:shadow-none">
                    <span className="text-[9px] text-slate-555 dark:text-slate-500 uppercase font-semibold block">Current Run Rate</span>
                    <span className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 mt-0.5 block">7.64</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-850 rounded-xl text-center shadow-sm dark:shadow-none">
                    <span className="text-[9px] text-slate-555 dark:text-slate-500 uppercase font-semibold block">Required Run Rate</span>
                    <span className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 mt-0.5 block">9.86</span>
                  </div>
                </div>

                <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-450 border-t border-slate-200/60 dark:border-slate-850/60 pt-2 font-semibold uppercase tracking-wider">
                  <span>Overs Left: <strong className="text-slate-750 dark:text-slate-200 font-mono">14.3</strong></span>
                  <span>Wickets Left: <strong className="text-slate-750 dark:text-slate-200 font-mono">8</strong></span>
                </div>
              </div>

              {/* Decorative Floating Trophy icon */}
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br from-highlight/15 dark:from-highlight/40 to-transparent flex items-center justify-center blur-[0.5px] glow-gold">
                <Trophy className="w-8 h-8 text-highlight" />
              </div>
            </motion.div>

            {/* Floating Cricket Ball */}
            <motion.div
              animate={{
                y: [0, -18, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 -left-4 w-12 h-12 bg-gradient-to-br from-[#ef4444] to-[#991b1b] rounded-full border-2 border-white dark:border-slate-900 shadow-sm dark:shadow-[0_10px_20px_rgba(239,68,68,0.4)] flex items-center justify-center z-20 cursor-pointer"
            >
              <div className="absolute w-full h-0.5 bg-slate-100/40 rotate-45" />
              <div className="absolute w-full h-0.5 bg-slate-100/40 -rotate-45" />
              <div className="absolute w-full h-full rounded-full border border-dashed border-slate-100/10" />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;